import { Link } from 'react-router';
import { branding, brandingMarkViewBox } from '@/assets/original-art';
import { cx } from '@/lib/cx';

interface WordmarkProps {
  to?: string;
  label: string;
  className?: string;
  compact?: boolean;
}

function BrandSvg({ viewBox, className }: { viewBox: string; className: string }) {
  return (
    <svg viewBox={viewBox} className={className} fill="currentColor" aria-hidden="true" focusable="false">
      {branding.paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}

export function Wordmark({ to = '/?pick=1', label, className, compact = false }: WordmarkProps) {
  return (
    <Link to={to} className={cx('wordmark', className)} data-compact={compact} aria-label={label}>
      <BrandSvg viewBox={branding.viewBox} className="wordmark-full" />
      {compact && <BrandSvg viewBox={brandingMarkViewBox} className="wordmark-mark" />}
    </Link>
  );
}
