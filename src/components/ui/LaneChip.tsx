import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cx } from '@/lib/cx';

export type ChipTone = 'ink' | 'brand' | 'soft' | 'outline';

interface LaneChipProps {
  tone?: ChipTone;
  size?: 'sm' | 'md';
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function LaneChip({ tone = 'ink', size = 'md', icon, className, children }: LaneChipProps) {
  return (
    <span className={cx('lane-chip', className)} data-tone={tone} data-size={size}>
      {icon}
      {children}
    </span>
  );
}

interface LaneChipLinkProps extends LaneChipProps {
  to: string;
  current?: boolean;
}

export function LaneChipLink({
  to,
  current,
  tone = 'ink',
  size = 'md',
  icon,
  className,
  children,
}: LaneChipLinkProps) {
  return (
    <Link
      to={to}
      className={cx('lane-chip', className)}
      data-tone={tone}
      data-size={size}
      aria-current={current ? 'page' : undefined}
    >
      {icon}
      {children}
    </Link>
  );
}
