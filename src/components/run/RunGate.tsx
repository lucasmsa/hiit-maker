import { PlayIcon } from '@/components/run/run-icons';
import { Button } from '@/components/ui/Button';
import { Digits } from '@/components/ui/Digits';
import { LaneChip } from '@/components/ui/LaneChip';

interface RunGateProps {
  chip: string;
  title: string;
  clock?: string;
  clockLabel?: string;
  meta?: string;
  body?: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function RunGate({
  chip,
  title,
  clock,
  clockLabel,
  meta,
  body,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: RunGateProps) {
  return (
    <section className="run-gate">
      <LaneChip tone="brand" className="run-chip">
        {chip}
      </LaneChip>
      <h1 className="run-gate-title">{title}</h1>
      {clock ? <Digits value={clock} label={clockLabel ?? title} className="run-digits" /> : null}
      {meta ? <p className="run-meta">{meta}</p> : null}
      {body ? <p className="run-meta">{body}</p> : null}
      <div className="run-gate-actions">
        <button type="button" className="run-round" data-pulse="true" aria-label={primaryLabel} onClick={onPrimary}>
          <PlayIcon size={52} />
        </button>
        <span className="run-gate-primary-label" aria-hidden="true">
          {primaryLabel}
        </span>
        {secondaryLabel && onSecondary ? (
          <Button variant="ghost" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
