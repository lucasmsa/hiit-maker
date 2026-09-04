import { Link } from 'react-router';
import { PlayIcon } from '@/components/hiit/HiitIcons';
import { cx } from '@/lib/cx';

interface PlayButtonProps {
  to: string;
  label: string;
  disabled: boolean;
  className?: string;
}

export function PlayButton({ to, label, disabled, className }: PlayButtonProps) {
  if (disabled) {
    return (
      <span className={cx('play-button', className)} aria-disabled="true" aria-label={label} role="link">
        <PlayIcon size={52} />
      </span>
    );
  }
  return (
    <Link to={to} className={cx('play-button', className)} aria-label={label}>
      <PlayIcon size={52} />
    </Link>
  );
}
