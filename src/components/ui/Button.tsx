import type { ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverse';
export type ButtonSize = 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-button font-body font-bold whitespace-nowrap select-none transition-colors duration-150 disabled:opacity-50';

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-4 text-2',
  lg: 'h-14 px-6 text-3',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-deep text-white hover:bg-[#a81c23]',
  secondary: 'bg-ink text-white hover:bg-black',
  ghost: 'bg-transparent text-ink hover:bg-ink/10',
  danger: 'bg-white text-brand-deep border-2 border-brand-deep hover:bg-brand-soft',
  inverse: 'bg-white text-ink hover:bg-chalk',
};

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string): string {
  return cx(base, sizes[size], variants[variant], className);
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...rest} />;
}
