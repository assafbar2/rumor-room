import type { CaseFile, EvidenceSlip, ResearchMove, VerdictResponse } from '../../shared/types';
import { ClaimCard } from './ClaimCard';
import { EvidenceTray } from './EvidenceTray';
import { InvestigationDock } from './InvestigationDock';
import { VerdictReceipt } from './VerdictReceipt';

interface BoardProps {
  caseFile: Omit<CaseFile, 'unsupportedClaimId' | 'fixtureEvidence'>;
  casePosition: number;
  totalCases: number;
  tokens: number;
  campaignScore: number;
  completedCases: number;
  selectedClaimId: string | null;
  evidence: EvidenceSlip[];
  evidenceByClaim: Record<string, EvidenceSlip[]>;
  latestEvidenceIds: string[];
  analysis: string;
  loadingMove: ResearchMove | null;
  verdict: VerdictResponse | null;
  error: string | null;
  onSelectClaim: (claimId: string) => void;
  onInvestigate: (move: ResearchMove) => void;
  onAccuse: () => void;
  onNext: () => void;
}

export function Board(props: BoardProps) {
  const selectedClaim = props.caseFile.claims.find((claim) => claim.id === props.selectedClaimId);
  const actualClaim = props.caseFile.claims.find((claim) => claim.id === props.verdict?.unsupportedClaimId);

  return (
    <main className="board-shell">
      <div className={`projector-beam ${props.loadingMove ? 'is-searching' : ''}`} aria-hidden="true" />
      <section className="case-board">
        <div className="case-header">
          <div>
            <p className="eyebrow">Case {props.caseFile.caseNumber} · {props.caseFile.mechanic.replace('-', ' ')}</p>
            <h1>{props.caseFile.title}</h1>
            <p className="dateline">{props.caseFile.dateline}</p>
          </div>
          <div className="case-stats">
            <div className="campaign-score-readout" aria-label={`Campaign score ${props.campaignScore}`}>
              <span>Campaign score</span>
              <strong>{props.campaignScore.toLocaleString()}</strong>
              <small>{props.completedCases} of {props.totalCases} cases closed</small>
            </div>
            <div className="token-counter" aria-label={`${props.tokens} research turns remaining`}>
              <span>Research turns</span>
              <div>
                {[0, 1, 2, 3].map((token) => <i key={token} className={token < props.tokens ? 'is-full' : ''} />)}
              </div>
              <strong>{props.tokens.toString().padStart(2, '0')}</strong>
            </div>
          </div>
        </div>

        <div className="board-layout">
          <div className="investigation-column">
            <section className="claims-section" aria-labelledby="claims-title">
              <div className="flow-strip">
                <span><b>1</b> Select any claim</span>
                <i aria-hidden="true">→</i>
                <span><b>2</b> Apply one research move</span>
                <i aria-hidden="true">→</i>
                <span><b>3</b> Switch, repeat, or accuse</span>
              </div>
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">Suspect claims</p>
                  <h2 id="claims-title">One cannot survive scrutiny</h2>
                </div>
                <p>{props.caseFile.mission}</p>
              </div>
              <div className="claim-grid">
                {props.caseFile.claims.map((claim) => (
                  <ClaimCard
                    key={claim.id}
                    claim={claim}
                    evidence={props.evidenceByClaim[claim.id] ?? []}
                    selected={props.selectedClaimId === claim.id}
                    disabled={Boolean(props.loadingMove)}
                    onSelect={() => props.onSelectClaim(claim.id)}
                  />
                ))}
              </div>
            </section>

            <InvestigationDock
              tokens={props.tokens}
              selectedClaim={selectedClaim?.label ?? null}
              loadingMove={props.loadingMove}
              onInvestigate={props.onInvestigate}
            />

            {props.error && <div className="error-banner" role="alert">{props.error}</div>}

            <div className="accusation-bar">
              <div>
                <span>Current suspect</span>
                <strong>{selectedClaim ? `${selectedClaim.label}: ${selectedClaim.statement}` : 'Select a claim'}</strong>
              </div>
              <button
                className="accuse-button"
                onClick={props.onAccuse}
                disabled={!selectedClaim || Boolean(props.loadingMove)}
              >
                Accuse this claim
              </button>
            </div>
          </div>

          <EvidenceTray
            evidence={props.evidence}
            latestEvidenceIds={props.latestEvidenceIds}
            analysis={props.analysis}
          />
        </div>
      </section>

      {props.verdict && selectedClaim && actualClaim && (
        <VerdictReceipt
          caseFile={props.caseFile}
          accusedClaim={selectedClaim}
          actualClaim={actualClaim}
          verdict={props.verdict}
          campaignScore={props.campaignScore}
          casePosition={props.casePosition}
          totalCases={props.totalCases}
          onNext={props.onNext}
        />
      )}
    </main>
  );
}
