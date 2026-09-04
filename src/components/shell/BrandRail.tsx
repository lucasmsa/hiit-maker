import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';
import { Wordmark } from '@/components/ui/Wordmark';
import { GearIcon, GitHubMarkIcon } from '@/components/hiit/OriginalIcons';

export const githubUrl = 'https://github.com/lucasmsa/hiit-maker';

interface BrandRailProps {
  languageLabel: string;
  onToggleLanguage: () => void;
  className?: string;
  label?: string;
  children?: ReactNode;
}

export function BrandRail({
  languageLabel,
  onToggleLanguage,
  className,
  label,
  children,
}: BrandRailProps) {
  const t = useT();
  return (
    <aside className={cx('brand-rail', className)} aria-label={label}>
      <Wordmark label={t('nav.home')} compact />
      <div className="brand-rail-icons">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={t('nav.github')}
          className="rail-control"
        >
          <GitHubMarkIcon size={26} />
        </a>
        <Link to="/settings" aria-label={t('nav.settings')} className="rail-control">
          <GearIcon size={26} />
        </Link>
        <button
          type="button"
          onClick={onToggleLanguage}
          aria-label={t('settings.language.switch')}
          className="rail-control font-display text-2 font-bold"
        >
          {languageLabel}
        </button>
      </div>
      {children ? <div className="brand-rail-body">{children}</div> : null}
    </aside>
  );
}
