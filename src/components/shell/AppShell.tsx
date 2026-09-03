import { Link, Outlet } from 'react-router';
import { useT } from '@/hooks/useT';
import { useShell } from '@/hooks/useShell';
import { Wordmark } from '@/components/ui/Wordmark';
import { LaneChipLink } from '@/components/ui/LaneChip';
import { GitHubIcon, SlidersIcon } from '@/components/ui/icons';

const githubUrl = 'https://github.com/lucasmsa/hiit-maker';

const headerControlClass =
  'grid size-11 shrink-0 place-items-center rounded-button text-ink transition-colors duration-150 hover:bg-ink/10';

export function AppShell() {
  const t = useT();
  const { languageLabel, toggleLanguage, currentMode } = useShell();
  return (
    <div className="min-h-dvh bg-chalk text-ink">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-ink/10 bg-chalk/95 px-3 backdrop-blur sm:gap-5 sm:px-6">
        <Wordmark label={t('nav.home')} className="text-brand" compact />
        <nav aria-label={t('nav.modes')} className="flex items-center gap-2">
          <LaneChipLink
            to="/hiit"
            size="sm"
            tone={currentMode === 'hiit' ? 'brand' : 'outline'}
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
        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t('settings.language.switch')}
            className={`${headerControlClass} cursor-pointer text-sm font-bold`}
          >
            {languageLabel}
          </button>
          <Link to="/settings" aria-label={t('nav.settings')} className={headerControlClass}>
            <SlidersIcon />
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={t('nav.github')}
            className={headerControlClass}
          >
            <GitHubIcon />
          </a>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
