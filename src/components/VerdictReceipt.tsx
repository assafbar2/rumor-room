import type { CaseFile, Claim, VerdictResponse } from '../../shared/types';

interface VerdictReceiptProps {
  caseFile: Omit<CaseFile, 'unsupportedClaimId' | 'fixtureEvidence'>;
  accusedClaim: Claim;
  actualClaim: Claim;
  verdict: VerdictResponse;
  campaignScore: number;
  casePosition: number;
  totalCases: number;
  onNext: () => void;
}

export function VerdictReceipt({
  caseFile,
  accusedClaim,
  actualClaim,
  verdict,
  campaignScore,
  casePosition,
  totalCases,
  onNext,
}: VerdictReceiptProps) {
  return (
    <div className="verdict-overlay" role="dialog" aria-modal="true" aria-labelledby="verdict-title">
      <div className="receipt">
        <div className={`verdict-stamp ${verdict.correct ? 'correct' : 'incorrect'}`}>
          {verdict.correct ? 'Verified' : 'Misfiled'}
        </div>
        <p className="eyebrow">Evidence receipt · Case {caseFile.caseNumber}</p>
        <h2 id="verdict-title">{verdict.correct ? 'You stopped the bad story.' : 'The wrong claim took the fall.'}</h2>
        <p className="receipt-lede">
          You accused <strong>{accusedClaim.label}</strong>. The unsupported claim was <strong>{actualClaim.label}</strong>.
        </p>
        <div className="receipt-claim">“{actualClaim.statement}”</div>
        <p className="receipt-reveal">{verdict.reveal}</p>
        <div className="score-grid">
          <div><span>Verdict</span><strong>{verdict.score.verdict}</strong></div>
          <div><span>Efficiency</span><strong>{verdict.score.efficiency}</strong></div>
          <div><span>Evidence</span><strong>{verdict.score.evidence}</strong></div>
          <div><span>Provenance</span><strong>{verdict.score.provenance}</strong></div>
        </div>
        <div className="total-score">
          <span>Case score</span>
          <strong>{verdict.score.total.toLocaleString()}</strong>
        </div>
        <div className="campaign-total">
          <span>Campaign total</span>
          <strong>{campaignScore.toLocaleString()}</strong>
        </div>
        <p className="score-explanation">Case points reward a correct verdict, unused turns, independent evidence, and circular-source detection. The campaign total adds each completed case until you start over.</p>
        <p className="verification-note"><span>Why this case matters:</span> {verdict.verificationNote}</p>
        <button className="primary-button" onClick={onNext}>
          {casePosition < totalCases ? 'Take the next case' : 'Start a new campaign'}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
