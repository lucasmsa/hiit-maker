import { cx } from '@/lib/cx';

interface ToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  className?: string;
}

export function Toggle({ id, label, checked, onChange, className }: ToggleProps) {
  return (
    <div className={cx('flex items-center justify-between gap-4', className)}>
      <span id={`${id}-label`} className="font-bold">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        onClick={() => onChange(!checked)}
        className={cx(
          'relative h-8 w-14 shrink-0 rounded-full transition-colors duration-150',
          checked ? 'bg-brand' : 'bg-ink/25',
        )}
      >
        <span
          className={cx(
            'absolute top-1 size-6 rounded-full bg-white transition-[left] duration-150',
            checked ? 'left-7' : 'left-1',
          )}
        />
      </button>
    </div>
  );
}
