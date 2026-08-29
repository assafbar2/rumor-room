import { describe, expect, it } from 'vitest';
import { cases } from '../shared/cases.js';
import { researchMoves } from '../shared/types.js';
import { getResearchHints } from './research-hints.js';

describe('authored live research hints', () => {
  it('provides adversarial queries for every claim and research move', () => {
    for (const caseFile of cases) {
      for (const claim of caseFile.claims) {
        for (const move of researchMoves) {
          const queries = getResearchHints(caseFile.id, claim.id, move);
          expect(queries.length).toBeGreaterThanOrEqual(2);
          expect(queries.length).toBeLessThanOrEqual(3);
        }
      }
    }
  });

  it('forces the stale Zelda search to challenge the claimed date', () => {
    expect(getResearchHints('deadline-shift', 'zelda', 'fresh-cut')).toContain(
      'Legend Zelda April 30 2027 Nintendo',
    );
  });
});
