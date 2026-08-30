import type { EvidenceSlip } from '../../shared/types';
import { formatDate } from '../lib/game';

interface EvidenceTrayProps {
  evidence: EvidenceSlip[];
  latestEvidenceIds: string[];
  analysis: string;
}

const qualityLabels = {
  official: 'Official record',
  independent: 'Independent source',
  secondary: 'Secondary report',
  circular: 'Circular source',
};

export function EvidenceTray({ evidence, latestEvidenceIds, analysis }: EvidenceTrayProps) {
  const orderedEvidence = [...evidence].reverse();

  return (
    <aside className="evidence-tray" aria-labelledby="evidence-title">
      <div className="tray-header">
        <div>
          <p className="eyebrow">Evidence tray</p>
          <h2 id="evidence-title">Source receipts</h2>
        </div>
        <span className="evidence-count">{evidence.length.toString().padStart(2, '0')}</span>
      </div>
      <div className="desk-analysis" aria-live="polite">
        <span>Desk note</span>
        <p>{analysis}</p>
      </div>
      <div className="evidence-list">
        {orderedEvidence.length === 0 ? (
          <div className="empty-tray">
            <span className="empty-crosshair" aria-hidden="true">＋</span>
            <p>No evidence pinned.</p>
            <small>Select a claim and spend a research turn.</small>
          </div>
        ) : (
          orderedEvidence.map((slip) => (
            <article
              key={slip.id}
              className={`evidence-slip stance-${slip.stance} quality-${slip.quality} ${latestEvidenceIds.includes(slip.id) ? 'is-new' : ''}`}
            >
              <div className="slip-pin" aria-hidden="true" />
              <div className="slip-meta">
                <span>{qualityLabels[slip.quality]}</span>
                <time dateTime={slip.publishedAt}>{formatDate(slip.publishedAt)}</time>
              </div>
              <h3>{slip.title}</h3>
              <p className="publisher">{slip.publisher}</p>
              <blockquote>{slip.excerpt}</blockquote>
              <p className="provenance">{slip.provenance}</p>
              <a href={slip.url} target="_blank" rel="noreferrer">
                Open source <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))
        )}
      </div>
    </aside>
  );
}
