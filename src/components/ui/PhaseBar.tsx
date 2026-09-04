import type { CSSProperties } from 'react';
import { cx } from '@/lib/cx';

interface PhaseBarProps {
  progress: number;
  color: string;
  height?: number;
  className?: string;
  label?: string;
}

export function PhaseBar({ progress, color, height = 14, className, label }: PhaseBarProps) {
  const style = {
    '--progress': Math.min(1, Math.max(0, progress)),
    '--bar-color': color,
    '--bar-h': `${height}px`,
  } as CSSProperties;
  return (
    <div
      className={cx('phase-bar', className)}
      style={style}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="phase-bar-fill" />
    </div>
  );
}
