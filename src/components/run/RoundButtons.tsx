import { BackIcon, PauseIcon, PlayIcon, SkipIcon, StopIcon } from '@/components/run/run-icons';

interface RoundButtonsProps {
  isPaused: boolean;
  pulsing: boolean;
  pauseLabel: string;
  resumeLabel: string;
  onTogglePause: () => void;
  stopLabel: string;
  onStop: () => void;
  backLabel: string;
  onBack: () => void;
  skipLabel: string;
  onSkip: () => void;
  hint: string;
}

export function RoundButtons({
  isPaused,
  pulsing,
  pauseLabel,
  resumeLabel,
  onTogglePause,
  stopLabel,
  onStop,
  backLabel,
  onBack,
  skipLabel,
  onSkip,
  hint,
}: RoundButtonsProps) {
  return (
    <div className="run-buttons">
      <div className="run-round-row">
        <button
          type="button"
          className="run-round"
          data-pulse={pulsing}
          aria-label={isPaused ? resumeLabel : pauseLabel}
          onClick={onTogglePause}
        >
          {isPaused ? <PlayIcon size={52} /> : <PauseIcon size={52} />}
        </button>
        <button type="button" className="run-round run-round-small" aria-label={stopLabel} onClick={onStop}>
          <StopIcon size={28} />
        </button>
      </div>
      <div className="run-textrow">
        <button type="button" className="run-text" onClick={onBack}>
          <BackIcon size={18} />
          {backLabel}
        </button>
        <button type="button" className="run-text" onClick={onSkip}>
          {skipLabel}
          <SkipIcon size={18} />
        </button>
      </div>
      <p className="run-hint">{hint}</p>
    </div>
  );
}
