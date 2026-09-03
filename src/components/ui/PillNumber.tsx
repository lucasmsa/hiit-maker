import { useT } from '@/hooks/useT';
import { clamp, parseNumberInput, stepValue } from '@/lib/number';
import { cx } from '@/lib/cx';
import { MinusIcon, PlusIcon } from '@/components/ui/icons';

interface PillNumberProps {
  id: string;
  label: string;
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string | undefined;
  className?: string | undefined;
}

export function PillNumber({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  className,
}: PillNumberProps) {
  const t = useT();
  return (
    <span className={cx('pill-number', className)}>
      <button
        type="button"
        aria-label={t('action.decrease')}
        className="pill-number-step"
        disabled={value <= min}
        onClick={() => onChange(stepValue(value, -step, min, max))}
      >
        <MinusIcon size={16} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(clamp(parseNumberInput(event.target.value, value), min, max))}
        className="pill-number-input"
      />
      {unit ? <span className="pill-number-unit">{unit}</span> : null}
      <button
        type="button"
        aria-label={t('action.increase')}
        className="pill-number-step"
        disabled={value >= max}
        onClick={() => onChange(stepValue(value, step, min, max))}
      >
        <PlusIcon size={16} />
      </button>
    </span>
  );
}
