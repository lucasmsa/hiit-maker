import { Link } from 'react-router';
import { LaneChipLink } from '@/components/ui/LaneChip';
import { GearIcon, GitHubMarkIcon } from '@/components/hiit/OriginalIcons';
import { useShell } from '@/hooks/useShell';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';

const githubUrl = 'https://github.com/lucasmsa/hiit-maker';

interface BuilderControlsProps {
  className?: string;
}

export function BuilderControls({ className }: BuilderControlsProps) {
  const t = useT();
  const { languageLabel, toggleLanguage } = useShell();
  return (
    <div className={cx('flex flex-wrap items-center justify-center gap-1', className)}>
      <a href={githubUrl} target="_blank" rel="noreferrer" aria-label={t('nav.github')} className="rail-control">
        <GitHubMarkIcon size={26} />
      </a>
      <Link to="/settings" aria-label={t('nav.settings')} className="rail-control">
        <GearIcon size={26} />
      </Link>
      <nav aria-label={t('nav.modes')} className="mx-1 flex items-center gap-1.5">
        <LaneChipLink to="/hiit" size="sm" tone="ink" current>
          {t('mode.hiit')}
        </LaneChipLink>
        <LaneChipLink to="/gym" size="sm" tone="outline" className="lane-chip-onred">
          {t('mode.gym')}
        </LaneChipLink>
      </nav>
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={t('settings.language.switch')}
        className="rail-control font-body text-sm font-bold"
      >
        {languageLabel}
      </button>
    </div>
  );
}
