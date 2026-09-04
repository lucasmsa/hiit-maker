import type { InputHTMLAttributes, ReactNode } from 'react';
import { useT } from '@/hooks/useT';
import { parseNumberInput, stepValue } from '@/lib/number';
import { cx } from '@/lib/cx';
import { IconButton } from '@/components/ui/IconButton';
import { MinusIcon, PlusIcon } from '@/components/ui/icons';

interface FieldProps {
  id: string;
  label: string;
  hint?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}

export function Field({ id, label, hint, className, children }: FieldProps) {
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-1 font-bold text-ink-soft">
        {label}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-1 text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  'h-11 w-full rounded-button border-2 border-ink/20 bg-white px-3 font-body text-2 text-ink placeholder:text-ink-soft focus:border-ink';

export function TextInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(inputClass, className)} {...rest} />;
}

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hint?: string | undefined;
  className?: string | undefined;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  hint,
  className,
}: NumberFieldProps) {
  const t = useT();
  return (
    <Field id={id} label={label} hint={hint} className={className}>
      <div className="flex items-center gap-1">
        <IconButton
          label={t('action.decrease')}
          onClick={() => onChange(stepValue(value, -step, min, max))}
          disabled={value <= min}
        >
          <MinusIcon />
        </IconButton>
        <div className="relative flex-1">
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) =>
              onChange(stepValue(parseNumberInput(event.target.value, value) - step, step, min, max))
            }
            aria-describedby={hint ? `${id}-hint` : undefined}
            className={cx(inputClass, 'text-center font-bold tabular-nums', unit && 'pr-10')}
          />
          {unit ? (
            <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-1 font-bold text-ink-soft">
              {unit}
            </span>
          ) : null}
        </div>
        <IconButton
          label={t('action.increase')}
          onClick={() => onChange(stepValue(value, step, min, max))}
          disabled={value >= max}
        >
          <PlusIcon />
        </IconButton>
      </div>
    </Field>
  );
}
