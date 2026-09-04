import { MinusIcon, PlusIcon } from '@/components/ui/icons';
import { useDraftNumber } from '@/hooks/useDraftNumber';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';

interface PillNumberProps {
  id: string;
  label: string;
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function PillNumber({ id, label, value, onChange, min, max, step = 5, unit, className }: PillNumberProps) {
  const t = useT();
  const field = useDraftNumber(value, onChange, min, max, step);
  return (
    <div className={cx('flex flex-col items-start gap-1', className)}>
      <label htmlFor={id} className="pill-label">
        {label}
      </label>
      <span className="pill">
        <button
          type="button"
          className="pill-step"
          aria-label={`${t('action.decrease')}: ${label}`}
          onClick={field.decrease}
          disabled={field.atMin}
        >
          <MinusIcon size={16} />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={field.text}
          onChange={(event) => field.change(event.target.value)}
          onBlur={field.commit}
        />
        {unit ? <span className="pill-unit">{unit}</span> : null}
        <button
          type="button"
          className="pill-step"
          aria-label={`${t('action.increase')}: ${label}`}
          onClick={field.increase}
          disabled={field.atMax}
        >
          <PlusIcon size={16} />
        </button>
      </span>
    </div>
  );
}
