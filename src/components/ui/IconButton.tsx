import type { ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  label: string;
  tone?: 'ink' | 'inverse' | 'brand';
}

const tones = {
  ink: 'text-ink hover:bg-ink/10',
  inverse: 'text-white hover:bg-white/15',
  brand: 'text-brand-deep hover:bg-brand-soft',
};

export function IconButton({ label, tone = 'ink', className, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={undefined}
      className={cx(
        'grid size-11 shrink-0 place-items-center rounded-button transition-colors duration-150 disabled:opacity-50',
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}
