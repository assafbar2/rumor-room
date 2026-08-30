import type { RuntimeStatus } from '../../shared/types';

interface TopBarProps {
  runtime: RuntimeStatus | null;
  muted: boolean;
  showRestart: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
}

export function TopBar({ runtime, muted, showRestart, onToggleMute, onRestart }: TopBarProps) {
  const live = runtime?.provider === 'gemini-parallel';

  return (
    <header className="topbar">
      <div className="brand-lockup" aria-label="The Rumor Room">
        <span className="brand-kicker">Confidential intelligence desk</span>
        <span className="brand-title">The Rumor Room</span>
      </div>
      <div className="topbar-actions">
        <div
          className={`runtime-badge ${live ? 'is-live' : ''}`}
          title={live ? 'Every research turn calls Parallel Search at runtime.' : 'Saved evidence is active for local tests.'}
        >
          <span className="runtime-light" />
          {live ? 'Parallel live search' : 'Saved test evidence'}
        </div>
        {showRestart && <button className="text-button" onClick={onRestart}>Start over</button>}
        <button className="icon-button" onClick={onToggleMute} aria-label={muted ? 'Turn sound on' : 'Mute sound'}>
          <span aria-hidden="true">{muted ? '◖' : '◉'}</span>
          <span>{muted ? 'Sound off' : 'Sound on'}</span>
        </button>
      </div>
    </header>
  );
}
