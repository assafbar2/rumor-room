import type { CaseFile } from '../../shared/types';

interface BriefingProps {
  caseFile: Omit<CaseFile, 'unsupportedClaimId' | 'fixtureEvidence'>;
  casePosition: number;
  totalCases: number;
  onStart: () => void;
}

const mechanicLabels = {
  'circular-sourcing': 'Source provenance',
  'stale-information': 'Freshness control',
  'headline-distortion': 'Context extraction',
};

export function Briefing({ caseFile, casePosition, totalCases, onStart }: BriefingProps) {
  return (
    <main className="briefing-screen">
      <div className="briefing-lamp" aria-hidden="true" />
      <article className="briefing-folder">
        <div className="folder-tab">CASE {caseFile.caseNumber}</div>
        <div className="briefing-stamp">Eyes only</div>
        <p className="eyebrow">Assignment {casePosition} of {totalCases}</p>
        <h1>{caseFile.title}</h1>
        <p className="dateline">{caseFile.dateline}</p>
        <p className="briefing-copy">{caseFile.briefing}</p>
        <div className="mission-strip">
          <span>Objective</span>
          <strong>{caseFile.mission}</strong>
        </div>
        <div className="briefing-facts">
          <div><span>Claims</span><strong>04</strong></div>
          <div><span>Research tokens</span><strong>04</strong></div>
          <div><span>Case pattern</span><strong>{mechanicLabels[caseFile.mechanic]}</strong></div>
        </div>
        <button className="primary-button briefing-button" onClick={onStart}>
          Open the case
          <span aria-hidden="true">→</span>
        </button>
      </article>
    </main>
  );
}
