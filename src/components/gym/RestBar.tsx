import { PhaseBar } from '@/components/ui/PhaseBar';
import { SkipIcon } from '@/components/shell/shell-icons';
import { formatClock } from '@/lib/digits';

interface RestBarProps {
  remainingSeconds: number;
  progress: number;
  finished: boolean;
  label: string;
  finishedLabel: string;
  skipLabel: string;
  onSkip: () => void;
}

export function RestBar({
  remainingSeconds,
  progress,
  finished,
  label,
  finishedLabel,
  skipLabel,
  onSkip,
}: RestBarProps) {
  return (
    <div role="status" aria-live="polite" className="rest-card">
      <div className="rest-card-inner">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-baseline gap-4">
            <span className="rest-card-label">{finished ? finishedLabel : label}</span>
            <span className="rest-card-time">{formatClock(remainingSeconds * 1000)}</span>
          </div>
          <PhaseBar progress={progress} color="var(--color-brand)" height={6} />
        </div>
        <button
          type="button"
          onClick={onSkip}
          disabled={finished}
          aria-label={skipLabel}
          className="pulse-button size-14 shrink-0"
        >
          <SkipIcon size={22} />
        </button>
      </div>
    </div>
  );
}
