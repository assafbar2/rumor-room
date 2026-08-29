import { describe, expect, it } from 'vitest';
import type { EvidenceSlip } from '../shared/types.js';
import { scoreVerdict } from './scoring.js';

const evidence: EvidenceSlip[] = [
  {
    id: 'official-denial',
    claimId: 'zelda',
    move: 'fresh-cut',
    title: 'Current schedule',
    publisher: 'NBC Universal',
    publishedAt: '2026-06-11',
    url: 'https://www.nbc.com/source',
    excerpt: 'The old date was replaced.',
    stance: 'contradicts',
    quality: 'official',
    provenance: 'Current studio schedule.',
    isIndependent: true,
  },
];

describe('verdict scoring', () => {
  it('rewards a correct, supported, efficient accusation', () => {
    const score = scoreVerdict(
      { sessionId: 'session', caseId: 'deadline-shift', accusedClaimId: 'zelda', evidenceIds: ['official-denial'], tokensRemaining: 3 },
      evidence,
    );

    expect(score.verdict).toBe(1000);
    expect(score.efficiency).toBe(375);
    expect(score.evidence).toBe(100);
    expect(score.total).toBe(1475);
  });

  it('does not award verdict points for the wrong claim', () => {
    const score = scoreVerdict(
      { sessionId: 'session', caseId: 'deadline-shift', accusedClaimId: 'shrek', evidenceIds: [], tokensRemaining: 2 },
      [],
    );
    expect(score.verdict).toBe(0);
  });
});
