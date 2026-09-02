import type { EvidenceQuality, EvidenceSlip, EvidenceStance, ResearchMove } from '../types.js';

export interface EvidenceSeed {
  title: string;
  publisher: string;
  publishedAt: string;
  url: string;
  excerpt: string;
  stance: EvidenceStance;
  quality: EvidenceQuality;
  provenance: string;
  isIndependent: boolean;
}

export type ClaimEvidence = Record<ResearchMove, EvidenceSeed[]>;

export const evidenceKey = (claimId: string, move: ResearchMove) => `${claimId}:${move}`;

export function buildEvidence(caseId: string, claims: Record<string, ClaimEvidence>) {
  return Object.fromEntries(
    Object.entries(claims).flatMap(([claimId, moves]) =>
      Object.entries(moves).map(([move, seeds]) => [
        evidenceKey(claimId, move as ResearchMove),
        seeds.map((seed, index): EvidenceSlip => ({
          ...seed,
          id: `${caseId}-${claimId}-${move}-${index + 1}`,
          claimId,
          move: move as ResearchMove,
        })),
      ]),
    ),
  );
}
