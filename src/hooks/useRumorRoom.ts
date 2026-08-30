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
  const [campaignScore, setCampaignScore] = useState(0);
  const [completedCases, setCompletedCases] = useState(0);
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
      void noirAudio.cue('search').catch(() => undefined);

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
          void noirAudio.cue('circular').catch(() => undefined);
        } else if (primary?.quality === 'official') {
          showSoundCaption('The file drawer shuts — official record found.');
          void noirAudio.cue('official').catch(() => undefined);
        } else if (primary?.stance === 'contradicts') {
          showSoundCaption('Two notes resolve — material contradiction found.');
          void noirAudio.cue('strong').catch(() => undefined);
        } else {
          showSoundCaption('The interval hangs — evidence remains uncertain.');
          void noirAudio.cue('weak').catch(() => undefined);
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
    void noirAudio.cue('accuse').catch(() => undefined);

    try {
      const result = await api.verdict({
        sessionId: sessionId.current,
        caseId: currentCase.id,
        accusedClaimId: selectedClaimId,
        evidenceIds: evidence.map((slip) => slip.id),
        tokensRemaining: tokens,
      });
      setVerdict(result);
      setCampaignScore((current) => current + result.score.total);
      setCompletedCases((current) => current + 1);
      setPhase('verdict');
      showSoundCaption(
        result.correct
          ? 'The projector steadies — verdict verified.'
          : 'The tape slows — the wrong claim took the fall.',
      );
      void noirAudio.cue(result.correct ? 'correct' : 'incorrect').catch(() => undefined);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The verdict desk is unavailable.');
    }
  }, [currentCase, evidence, loadingMove, selectedClaimId, showSoundCaption, tokens]);

  const nextCase = useCallback(() => {
    window.scrollTo(0, 0);
    const finishedCampaign = caseIndex === cases.length - 1;
    const nextIndex = finishedCampaign ? 0 : caseIndex + 1;
    setCaseIndex(nextIndex);
    setPhase('briefing');
    setTokens(4);
    setSelectedClaimId(null);
    setEvidence([]);
    setLatestEvidenceIds([]);
    setVerdict(null);
    setError(null);
    setAnalysis('The desk is quiet. Choose a claim and decide what kind of question will separate it from the others.');
    if (finishedCampaign) {
      setCampaignScore(0);
      setCompletedCases(0);
      sessionId.current = crypto.randomUUID();
    }
  }, [caseIndex, cases.length]);

  const restartCampaign = useCallback(() => {
    window.scrollTo(0, 0);
    sessionId.current = crypto.randomUUID();
    setCaseIndex(0);
    setPhase('briefing');
    setTokens(4);
    setSelectedClaimId(null);
    setEvidence([]);
    setLatestEvidenceIds([]);
    setVerdict(null);
    setError(null);
    setCampaignScore(0);
    setCompletedCases(0);
    setAnalysis('The desk is quiet. Choose a claim and decide what kind of question will separate it from the others.');
  }, []);

  const toggleMute = useCallback(async () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    try {
      await noirAudio.setMuted(nextMuted);
      if (!nextMuted) {
        showSoundCaption('Sound on — audio check.');
        void noirAudio.cue('strong').catch(() => undefined);
      }
    } catch {
      setMuted(true);
      showSoundCaption('Sound could not start — check browser audio permissions.');
    }
  }, [muted, showSoundCaption]);

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
    campaignScore,
    completedCases,
    startCase,
    selectClaim,
    investigate,
    accuse,
    nextCase,
    restartCampaign,
    toggleMute,
  };
}
