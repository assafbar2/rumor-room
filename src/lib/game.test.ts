import { describe, expect, it } from 'vitest';
import type { EvidenceSlip } from '../../shared/types';
import { evidenceLabel, suspicionScore } from './game';

function evidence(overrides: Partial<EvidenceSlip>): EvidenceSlip {
  return {
    id: 'evidence-1',
    claimId: 'claim-a',
    move: 'fresh-cut',
    title: 'Source',
    publisher: 'Publisher',
    publishedAt: '2026-08-28',
    url: 'https://example.com/source',
    excerpt: 'Excerpt',
    stance: 'uncertain',
    quality: 'secondary',
    provenance: 'Provenance',
    isIndependent: true,
    ...overrides,
  };
}

describe('evidence confidence', () => {
  it('starts unresolved', () => {
    expect(suspicionScore([])).toBe(50);
    expect(evidenceLabel([])).toBe('Unexamined');
  });

  it('makes official contradictions highly suspicious', () => {
    const slips = [
      evidence({ stance: 'contradicts', quality: 'official' }),
      evidence({ id: 'evidence-2', stance: 'contradicts', quality: 'independent' }),
    ];
    expect(suspicionScore(slips)).toBeGreaterThanOrEqual(72);
    expect(evidenceLabel(slips)).toBe('High suspicion');
  });

  it('provisionally clears independently supported claims', () => {
    const slips = [
      evidence({ stance: 'supports', quality: 'official' }),
      evidence({ id: 'evidence-2', stance: 'supports', quality: 'independent' }),
    ];
    expect(suspicionScore(slips)).toBeLessThanOrEqual(28);
    expect(evidenceLabel(slips)).toBe('Provisionally cleared');
  });
});
