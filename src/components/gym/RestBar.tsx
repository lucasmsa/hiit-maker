import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Digits } from '@/components/ui/Digits';
import { PhaseBar } from '@/components/ui/PhaseBar';
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

const digitsStyle = { '--digits-size': 'var(--text-7)' } as CSSProperties;

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
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-30 bg-black pb-[env(safe-area-inset-bottom)] text-white"
    >
      <PhaseBar progress={progress} color="var(--color-recover)" height={6} />
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3 sm:px-6">
        <span className="font-display text-4 font-extrabold text-recover">
          {finished ? finishedLabel : label}
        </span>
        <Digits
          value={formatClock(remainingSeconds * 1000)}
          style={digitsStyle}
          className="ml-auto"
        />
        <Button variant="inverse" onClick={onSkip} disabled={finished}>
          {skipLabel}
        </Button>
      </div>
    </div>
  );
}
