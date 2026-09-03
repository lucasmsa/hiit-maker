import { Digits } from '@/components/ui/Digits';

interface RunClockProps {
  label: string;
  labelColor: string;
  clock: string;
  clockLabel: string;
  nextText: string | undefined;
}

export function RunClock({ label, labelColor, clock, clockLabel, nextText }: RunClockProps) {
  return (
    <div className="run-clock">
      <p className="run-label" style={{ color: labelColor }}>
        {label}
      </p>
      <Digits value={clock} label={clockLabel} className="run-digits" />
      {nextText ? <p className="run-next-line">{nextText}</p> : null}
    </div>
  );
}
