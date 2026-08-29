import type { Claim, EvidenceSlip } from '../../shared/types';
import { evidenceLabel, suspicionScore } from '../lib/game';

interface ClaimCardProps {
  claim: Claim;
  evidence: EvidenceSlip[];
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}

export function ClaimCard({ claim, evidence, selected, disabled, onSelect }: ClaimCardProps) {
  const suspicion = suspicionScore(evidence);
  const status = evidenceLabel(evidence);
  const contradicts = evidence.filter((slip) => slip.stance === 'contradicts').length;
  const supports = evidence.filter((slip) => slip.stance === 'supports').length;

  return (
    <button
      className={`claim-card ${selected ? 'is-selected' : ''} ${suspicion >= 65 ? 'is-suspicious' : ''} ${suspicion <= 35 ? 'is-cleared' : ''}`}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className="claim-clip" aria-hidden="true" />
      <span className="claim-label">{claim.label}</span>
      <span className="claim-statement">{claim.statement}</span>
      <span className="claim-context">{claim.context}</span>
      <span className="claim-readout">
        <span>{status}</span>
        <span>{evidence.length} slip{evidence.length === 1 ? '' : 's'}</span>
      </span>
      <span className="confidence-track" aria-label={`${status}, suspicion ${suspicion} percent`}>
        <span style={{ width: `${suspicion}%` }} />
      </span>
      <span className="claim-tallies" aria-hidden="true">
        <span>+{supports}</span>
        <span>−{contradicts}</span>
      </span>
    </button>
  );
}
