import { PhaseBar } from '@/components/ui/PhaseBar';
import { BackIcon, PauseIcon, PlayIcon, SkipIcon, StopIcon } from '@/components/run/run-icons';

interface RunControlsProps {
  isPaused: boolean;
  pauseLabel: string;
  resumeLabel: string;
  backLabel: string;
  skipLabel: string;
  stopLabel: string;
  onTogglePause: () => void;
  onBack: () => void;
  onSkip: () => void;
  onStop: () => void;
  phaseProgress: number;
  phaseColor: string;
  phaseLabel: string;
  workoutProgress: number;
  workoutLabel: string;
}

export function RunControls({
  isPaused,
  pauseLabel,
  resumeLabel,
  backLabel,
  skipLabel,
  stopLabel,
  onTogglePause,
  onBack,
  onSkip,
  onStop,
  phaseProgress,
  phaseColor,
  phaseLabel,
  workoutProgress,
  workoutLabel,
}: RunControlsProps) {
  return (
    <section className="run-band">
      <div className="run-controls">
        <button type="button" className="run-ghost" onClick={onBack}>
          <BackIcon size={20} />
          <span>{backLabel}</span>
        </button>
        <button type="button" className="run-primary" onClick={onTogglePause} data-paused={isPaused}>
          {isPaused ? <PlayIcon size={28} /> : <PauseIcon size={28} />}
          <span>{isPaused ? resumeLabel : pauseLabel}</span>
        </button>
        <button type="button" className="run-ghost" onClick={onSkip}>
          <span>{skipLabel}</span>
          <SkipIcon size={20} />
        </button>
        <button type="button" className="run-ghost run-stop" onClick={onStop}>
          <StopIcon size={18} />
          <span>{stopLabel}</span>
        </button>
      </div>
      <div className="run-bars">
        <PhaseBar progress={phaseProgress} color={phaseColor} height={14} label={phaseLabel} />
        <PhaseBar progress={workoutProgress} color="#ffffff" height={4} label={workoutLabel} />
      </div>
    </section>
  );
}
