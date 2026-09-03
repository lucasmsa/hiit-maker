import { Link } from 'react-router';
import { DumbbellGlyph } from '@/components/ui/icons';
import { cx } from '@/lib/cx';

interface WordmarkProps {
  to?: string;
  label: string;
  className?: string;
}

export function Wordmark({ to = '/?pick=1', label, className }: WordmarkProps) {
  return (
    <Link to={to} className={cx('wordmark', className)} aria-label={label}>
      <span aria-hidden="true">H</span>
      <DumbbellGlyph />
      <DumbbellGlyph />
      <span aria-hidden="true">T</span>
      <span aria-hidden="true" className="wordmark-light">
        maker
      </span>
    </Link>
  );
}
