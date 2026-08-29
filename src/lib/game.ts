import type { EvidenceSlip } from '../../shared/types';

export function suspicionScore(evidence: EvidenceSlip[]) {
  if (!evidence.length) return 50;

  const raw = evidence.reduce((score, slip) => {
    const qualityWeight = {
      official: 22,
      independent: 17,
      secondary: 9,
      circular: 5,
    }[slip.quality];

    if (slip.stance === 'contradicts') return score + qualityWeight;
    if (slip.stance === 'supports') return score - qualityWeight;
    return score + (slip.quality === 'circular' ? 10 : 1);
  }, 50);

  return Math.max(6, Math.min(94, raw));
}

export function evidenceLabel(evidence: EvidenceSlip[]) {
  if (!evidence.length) return 'Unexamined';
  const score = suspicionScore(evidence);
  if (score >= 65) return 'High suspicion';
  if (score <= 35) return 'Provisionally cleared';
  return 'Under review';
}

export function formatDate(date: string) {
  if (date === 'unknown') return 'DATE UNKNOWN';
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.valueOf())) return date.toUpperCase();
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed).toUpperCase();
}
