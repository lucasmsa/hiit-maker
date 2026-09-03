import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Digits } from '@/components/ui/Digits';

interface RunGateProps {
  word: string;
  title: string;
  clock?: string;
  clockLabel?: string;
  meta?: string;
  body?: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  children?: ReactNode;
}

export function RunGate({
  word,
  title,
  clock,
  clockLabel,
  meta,
  body,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  children,
}: RunGateProps) {
  return (
    <section className="run-stage run-gate">
      <div className="run-stage-text">
        <p className="run-word">{word}</p>
        <h1 className="run-name">{title}</h1>
        {clock ? <Digits value={clock} label={clockLabel ?? title} className="run-gate-digits" /> : null}
        {meta ? <p className="run-position">{meta}</p> : null}
        {body ? <p className="run-body">{body}</p> : null}
        <div className="run-gate-actions">
          <Button variant="primary" size="lg" onClick={onPrimary} className="run-gate-primary">
            {primaryLabel}
          </Button>
          {secondaryLabel && onSecondary ? (
            <Button variant="inverse" size="lg" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
