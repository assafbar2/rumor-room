import { describe, expect, it } from 'vitest';
import { cases, getFixtureEvidence, publicCase } from './cases.js';
import { researchMoves } from './types.js';

describe('authored cases', () => {
  it('ships exactly three complete four-claim cases', () => {
    expect(cases).toHaveLength(3);

    for (const caseFile of cases) {
      expect(caseFile.claims).toHaveLength(4);
      expect(caseFile.claims.some((claim) => claim.id === caseFile.unsupportedClaimId)).toBe(true);
      expect(new Set(caseFile.claims.map((claim) => claim.id)).size).toBe(4);
    }
  });

  it('has deterministic evidence for every claim and move', () => {
    for (const caseFile of cases) {
      for (const claim of caseFile.claims) {
        for (const move of researchMoves) {
          const evidence = getFixtureEvidence(caseFile.id, claim.id, move);
          expect(evidence.length).toBeGreaterThan(0);
          expect(evidence.every((slip) => slip.claimId === claim.id && slip.move === move)).toBe(true);
        }
      }
    }
  });

  it('keeps fixture evidence inside each case research cutoff', () => {
    for (const caseFile of cases) {
      for (const evidence of Object.values(caseFile.fixtureEvidence).flat()) {
        if (evidence.publishedAt !== 'unknown') {
          expect(evidence.publishedAt <= caseFile.researchCutoff).toBe(true);
        }
      }
    }
  });

  it('never sends the answer or fixture bundle to the client', () => {
    const safeCase = publicCase(cases[0]);
    expect(safeCase).not.toHaveProperty('unsupportedClaimId');
    expect(safeCase).not.toHaveProperty('fixtureEvidence');
  });
});
