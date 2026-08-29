export const researchMoves = ['trace', 'second-source', 'studio-line', 'fresh-cut'] as const;

export type ResearchMove = (typeof researchMoves)[number];
export type EvidenceStance = 'supports' | 'contradicts' | 'uncertain';
export type EvidenceQuality = 'official' | 'independent' | 'secondary' | 'circular';
export type CaseMechanic = 'circular-sourcing' | 'stale-information' | 'headline-distortion';

export interface SourceReference {
  title: string;
  publisher: string;
  publishedAt: string;
  url: string;
}

export interface EvidenceSlip extends SourceReference {
  id: string;
  claimId: string;
  move: ResearchMove;
  excerpt: string;
  stance: EvidenceStance;
  quality: EvidenceQuality;
  provenance: string;
  isIndependent: boolean;
}

export interface Claim {
  id: string;
  label: string;
  statement: string;
  context: string;
}

export interface CaseFile {
  id: string;
  caseNumber: string;
  title: string;
  dateline: string;
  researchCutoff: string;
  mechanic: CaseMechanic;
  briefing: string;
  mission: string;
  claims: Claim[];
  unsupportedClaimId: string;
  reveal: string;
  verificationNote: string;
  fixtureEvidence: Record<string, EvidenceSlip[]>;
}

export interface InvestigationRequest {
  sessionId: string;
  caseId: string;
  claimId: string;
  move: ResearchMove;
  previousEvidenceIds: string[];
}

export interface InvestigationResponse {
  evidence: EvidenceSlip[];
  analysis: string;
  provider: 'fixture' | 'gemini-parallel';
  remainingTokens?: number;
}

export interface VerdictRequest {
  sessionId: string;
  caseId: string;
  accusedClaimId: string;
  evidenceIds: string[];
  tokensRemaining: number;
}

export interface ScoreBreakdown {
  verdict: number;
  efficiency: number;
  evidence: number;
  provenance: number;
  total: number;
}

export interface VerdictResponse {
  correct: boolean;
  unsupportedClaimId: string;
  reveal: string;
  verificationNote: string;
  score: ScoreBreakdown;
}

export interface RuntimeStatus {
  mode: 'fixture' | 'live';
  provider: 'fixture' | 'gemini-parallel';
  ready: boolean;
  message: string;
}
