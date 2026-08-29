import type { RuntimeStatus } from '../../shared/types';

interface TopBarProps {
  runtime: RuntimeStatus | null;
  muted: boolean;
  onToggleMute: () => void;
}

export function TopBar({ runtime, muted, onToggleMute }: TopBarProps) {
  const live = runtime?.provider === 'gemini-parallel';

  return (
    <header className="topbar">
      <div className="brand-lockup" aria-label="The Rumor Room">
        <span className="brand-kicker">Confidential intelligence desk</span>
        <span className="brand-title">The Rumor Room</span>
      </div>
      <div className="topbar-actions">
        <div className={`runtime-badge ${live ? 'is-live' : ''}`} title={runtime?.message}>
          <span className="runtime-light" />
          {live ? 'Parallel live wire' : 'Training archive'}
        </div>
        <button className="icon-button" onClick={onToggleMute} aria-label={muted ? 'Turn sound on' : 'Mute sound'}>
          <span aria-hidden="true">{muted ? '◖' : '◉'}</span>
          <span>{muted ? 'Sound off' : 'Sound on'}</span>
        </button>
      </div>
    </header>
  );
}
