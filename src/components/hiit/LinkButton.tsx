import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { buttonClass, type ButtonSize, type ButtonVariant } from '@/components/ui/Button';

interface LinkButtonProps {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export function LinkButton({ to, variant = 'primary', size = 'md', className, children }: LinkButtonProps) {
  return (
    <Link to={to} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}
