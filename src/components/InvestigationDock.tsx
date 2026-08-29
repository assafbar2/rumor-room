import type { ResearchMove } from '../../shared/types';

interface InvestigationDockProps {
  tokens: number;
  selectedClaim: string | null;
  loadingMove: ResearchMove | null;
  onInvestigate: (move: ResearchMove) => void;
}

const moves: Array<{ id: ResearchMove; number: string; title: string; description: string; bestFor: string }> = [
  {
    id: 'trace',
    number: '01',
    title: 'Trace It',
    description: 'Find the earliest discoverable source behind the claim.',
    bestFor: 'Origin & repetition',
  },
  {
    id: 'second-source',
    number: '02',
    title: 'Second Source',
    description: 'Look for corroboration that does not point back to the same report.',
    bestFor: 'Independence',
  },
  {
    id: 'studio-line',
    number: '03',
    title: 'Studio Line',
    description: 'Prioritize the organizations and representatives closest to the facts.',
    bestFor: 'Official record',
  },
  {
    id: 'fresh-cut',
    number: '04',
    title: 'Fresh Cut',
    description: 'Search after the claim for corrections, denials, and changed plans.',
    bestFor: 'What changed',
  },
];

export function InvestigationDock({ tokens, selectedClaim, loadingMove, onInvestigate }: InvestigationDockProps) {
  return (
    <section className="investigation-dock" aria-labelledby="moves-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Research desk</p>
          <h2 id="moves-title">Choose the question, not the answer</h2>
        </div>
        <span className="selected-indicator">{selectedClaim ? `${selectedClaim.toUpperCase()} selected` : 'Select a claim'}</span>
      </div>
      <div className="move-grid">
        {moves.map((move) => {
          const loading = loadingMove === move.id;
          return (
            <button
              key={move.id}
              className="move-card"
              onClick={() => onInvestigate(move.id)}
              disabled={!selectedClaim || tokens === 0 || Boolean(loadingMove)}
            >
              <span className="move-number">{move.number}</span>
              <span className="move-title">{loading ? 'Searching…' : move.title}</span>
              <span className="move-description">{move.description}</span>
              <span className="move-best">Best for: {move.bestFor}</span>
              <span className="token-cost"><i /> 1 token</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
