import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useT } from '@/hooks/useT';
import type { Mode } from '@/lib/types';
import { cx } from '@/lib/cx';
import { Wordmark } from '@/components/ui/Wordmark';
import { LaneChipLink } from '@/components/ui/LaneChip';
import { GearIcon, GitHubMarkIcon } from '@/components/hiit/OriginalIcons';

export const githubUrl = 'https://github.com/lucasmsa/hiit-maker';

interface BrandRailProps {
  currentMode: Mode | null;
  languageLabel: string;
  onToggleLanguage: () => void;
  className?: string;
  children?: ReactNode;
}

export function BrandRail({
  currentMode,
  languageLabel,
  onToggleLanguage,
  className,
  children,
}: BrandRailProps) {
  const t = useT();
  return (
    <aside className={cx('brand-rail', className)}>
      <Wordmark label={t('nav.home')} compact />
      <nav aria-label={t('nav.modes')} className="brand-rail-modes">
        <LaneChipLink
          to="/hiit"
          size="sm"
          tone={currentMode === 'hiit' ? 'ink' : 'outline'}
          current={currentMode === 'hiit'}
        >
          {t('mode.hiit')}
        </LaneChipLink>
        <LaneChipLink
          to="/gym"
          size="sm"
          tone={currentMode === 'gym' ? 'ink' : 'outline'}
          current={currentMode === 'gym'}
        >
          {t('mode.gym')}
        </LaneChipLink>
      </nav>
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
