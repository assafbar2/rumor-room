import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  CaseFile,
  EvidenceSlip,
  InvestigationResponse,
  ResearchMove,
  RuntimeStatus,
  VerdictResponse,
} from '../../shared/types';
import { api } from '../lib/api';
import { noirAudio } from '../lib/audio';

type PublicCase = Omit<CaseFile, 'unsupportedClaimId' | 'fixtureEvidence'>;
type Phase = 'loading' | 'briefing' | 'investigating' | 'verdict';

export function useRumorRoom() {
  const sessionId = useRef(crypto.randomUUID());
  const [cases, setCases] = useState<PublicCase[]>([]);
  const [runtime, setRuntime] = useState<RuntimeStatus | null>(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [tokens, setTokens] = useState(4);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [evidence, setEvidence] = useState<EvidenceSlip[]>([]);
  const [latestEvidenceIds, setLatestEvidenceIds] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState('The desk is quiet. Choose a claim and decide what kind of question will separate it from the others.');
  const [loadingMove, setLoadingMove] = useState<ResearchMove | null>(null);
  const [verdict, setVerdict] = useState<VerdictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [soundCaption, setSoundCaption] = useState('');
  const captionTimer = useRef<number | null>(null);

  const currentCase = cases[caseIndex];

  const showSoundCaption = useCallback((caption: string) => {
    if (captionTimer.current) window.clearTimeout(captionTimer.current);
    setSoundCaption(caption);
    captionTimer.current = window.setTimeout(() => setSoundCaption(''), 2600);
  }, []);

  useEffect(() => () => {
    if (captionTimer.current) window.clearTimeout(captionTimer.current);
  }, []);

  useEffect(() => {
    Promise.all([api.getCases(), api.getRuntime()])
      .then(([loadedCases, loadedRuntime]) => {
        setCases(loadedCases);
        setRuntime(loadedRuntime);
        setPhase('briefing');
      })
      .catch((caught: unknown) => {
        setError(caught instanceof Error ? caught.message : 'The newsroom failed to open.');
      });
  }, []);

  const evidenceByClaim = useMemo(() => {
    return Object.fromEntries(
      (currentCase?.claims ?? []).map((claim) => [claim.id, evidence.filter((slip) => slip.claimId === claim.id)]),
    );
  }, [currentCase, evidence]);

  const startCase = useCallback(() => {
    window.scrollTo(0, 0);
    setPhase('investigating');
    setSelectedClaimId(currentCase?.claims[0]?.id ?? null);
  }, [currentCase]);

  const selectClaim = useCallback((claimId: string) => {
    setSelectedClaimId(claimId);
    setLatestEvidenceIds([]);
  }, []);

  const investigate = useCallback(
    async (move: ResearchMove) => {
      if (!currentCase || !selectedClaimId || tokens <= 0 || loadingMove) return;
      setLoadingMove(move);
      setError(null);
      setLatestEvidenceIds([]);
      showSoundCaption('Film reel catches — research launched.');
      await noirAudio.cue('search');

      try {
        const result: InvestigationResponse = await api.investigate({
          sessionId: sessionId.current,
          caseId: currentCase.id,
          claimId: selectedClaimId,
          move,
          previousEvidenceIds: evidence.map((slip) => slip.id),
        });
        setEvidence((current) => [...current, ...result.evidence]);
        setLatestEvidenceIds(result.evidence.map((slip) => slip.id));
        setAnalysis(result.analysis);
        setTokens((current) => current - 1);

        const primary = result.evidence[0];
        if (primary?.quality === 'circular') {
          showSoundCaption('The echo returns — circular sourcing detected.');
          await noirAudio.cue('circular');
        } else if (primary?.quality === 'official') {
          showSoundCaption('The file drawer shuts — official record found.');
          await noirAudio.cue('official');
        } else if (primary?.stance === 'contradicts') {
          showSoundCaption('Two notes resolve — material contradiction found.');
          await noirAudio.cue('strong');
        } else {
          showSoundCaption('The interval hangs — evidence remains uncertain.');
          await noirAudio.cue('weak');
        }
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'The search failed. Your token was not spent.');
      } finally {
        setLoadingMove(null);
      }
    },
    [currentCase, evidence, loadingMove, selectedClaimId, showSoundCaption, tokens],
  );

  const accuse = useCallback(async () => {
    if (!currentCase || !selectedClaimId || loadingMove) return;
    setError(null);
    showSoundCaption('The room goes silent — accusation filed.');
    await noirAudio.cue('accuse');

    try {
      const result = await api.verdict({
        sessionId: sessionId.current,
        caseId: currentCase.id,
        accusedClaimId: selectedClaimId,
        evidenceIds: evidence.map((slip) => slip.id),
        tokensRemaining: tokens,
      });
      setVerdict(result);
      setPhase('verdict');
      showSoundCaption(
        result.correct
          ? 'The projector steadies — verdict verified.'
          : 'The tape slows — the wrong claim took the fall.',
      );
      await noirAudio.cue(result.correct ? 'correct' : 'incorrect');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The verdict desk is unavailable.');
    }
  }, [currentCase, evidence, loadingMove, selectedClaimId, showSoundCaption, tokens]);

  const nextCase = useCallback(() => {
    window.scrollTo(0, 0);
    const nextIndex = (caseIndex + 1) % cases.length;
    setCaseIndex(nextIndex);
    setPhase('briefing');
    setTokens(4);
    setSelectedClaimId(null);
    setEvidence([]);
    setLatestEvidenceIds([]);
    setVerdict(null);
    setError(null);
    setAnalysis('The desk is quiet. Choose a claim and decide what kind of question will separate it from the others.');
  }, [caseIndex, cases.length]);

  const toggleMute = useCallback(async () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    await noirAudio.setMuted(nextMuted);
  }, [muted]);

  return {
    cases,
    currentCase,
    runtime,
    phase,
    tokens,
    selectedClaimId,
    evidence,
    evidenceByClaim,
    latestEvidenceIds,
    analysis,
    loadingMove,
    verdict,
    error,
    muted,
    soundCaption,
    startCase,
    selectClaim,
    investigate,
    accuse,
    nextCase,
    toggleMute,
  };
}
