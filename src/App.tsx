import { Board } from './components/Board';
import { Briefing } from './components/Briefing';
import { TopBar } from './components/TopBar';
import { useRumorRoom } from './hooks/useRumorRoom';

export default function App() {
  const game = useRumorRoom();
  const casePosition = game.cases.findIndex((caseFile) => caseFile.id === game.currentCase?.id) + 1;

  return (
    <div className="app-frame">
      <div className="film-grain" aria-hidden="true" />
      <a className="skip-link" href="#main-game">Skip to investigation</a>
      <TopBar runtime={game.runtime} muted={game.muted} onToggleMute={game.toggleMute} />
      <div className={`sound-caption ${game.soundCaption ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {game.soundCaption}
      </div>

      <div id="main-game">
        {game.phase === 'loading' && (
          <main className="loading-screen" aria-live="polite">
            <div className="reel-loader" aria-hidden="true" />
            <p>Opening the intelligence desk…</p>
            {game.error && <div className="error-banner" role="alert">{game.error}</div>}
          </main>
        )}

        {game.phase === 'briefing' && game.currentCase && (
          <Briefing
            caseFile={game.currentCase}
            casePosition={casePosition}
            totalCases={game.cases.length}
            onStart={game.startCase}
          />
        )}

        {(game.phase === 'investigating' || game.phase === 'verdict') && game.currentCase && (
          <Board
            caseFile={game.currentCase}
            casePosition={casePosition}
            totalCases={game.cases.length}
            tokens={game.tokens}
            selectedClaimId={game.selectedClaimId}
            evidence={game.evidence}
            evidenceByClaim={game.evidenceByClaim}
            latestEvidenceIds={game.latestEvidenceIds}
            analysis={game.analysis}
            loadingMove={game.loadingMove}
            verdict={game.verdict}
            error={game.error}
            onSelectClaim={game.selectClaim}
            onInvestigate={game.investigate}
            onAccuse={game.accuse}
            onNext={game.nextCase}
          />
        )}
      </div>
    </div>
  );
}
