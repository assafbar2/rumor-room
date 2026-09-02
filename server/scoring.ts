import type { EvidenceSlip, ScoreBreakdown, VerdictRequest } from '../shared/types.js';
import { getCase } from '../shared/cases/index.js';

export function scoreVerdict(request: VerdictRequest, evidence: EvidenceSlip[]): ScoreBreakdown {
  const caseFile = getCase(request.caseId);
  const correct = caseFile?.unsupportedClaimId === request.accusedClaimId;
  const accusedEvidence = evidence.filter((slip) => slip.claimId === request.accusedClaimId);
  const independentCount = new Set(
    accusedEvidence.filter((slip) => slip.isIndependent).map((slip) => new URL(slip.url).hostname),
  ).size;
  const foundCircular = evidence.some((slip) => slip.quality === 'circular');
  const hasMaterialEvidence = accusedEvidence.some(
    (slip) => slip.stance === 'contradicts' && ['official', 'independent'].includes(slip.quality),
  );

  const verdict = correct ? (hasMaterialEvidence ? 1000 : 700) : 0;
  const efficiency = Math.max(0, request.tokensRemaining) * 125;
  const evidenceScore = Math.min(300, independentCount * 100);
  const provenance = foundCircular ? 250 : 0;

  return {
    verdict,
    efficiency,
    evidence: evidenceScore,
    provenance,
    total: verdict + efficiency + evidenceScore + provenance,
  };
}
