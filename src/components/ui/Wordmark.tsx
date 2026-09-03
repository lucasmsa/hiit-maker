import { Link } from 'react-router';
import { DumbbellGlyph } from '@/components/ui/icons';
import { cx } from '@/lib/cx';

interface WordmarkProps {
  to?: string;
  label: string;
  className?: string;
  compact?: boolean;
}

export function Wordmark({ to = '/?pick=1', label, className, compact = false }: WordmarkProps) {
  return (
    <Link to={to} className={cx('wordmark', className)} data-compact={compact} aria-label={label}>
      <span aria-hidden="true" className="wordmark-letter">
        H
      </span>
      <DumbbellGlyph />
      <DumbbellGlyph className="wordmark-letter" />
      <span aria-hidden="true" className="wordmark-letter">
        T
      </span>
      <span aria-hidden="true" className="wordmark-letter wordmark-light">
        maker
      </span>
    </Link>
  );
}
