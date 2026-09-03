import { Link, Outlet } from 'react-router';
import { useT } from '@/hooks/useT';
import { useShell } from '@/hooks/useShell';
import { Wordmark } from '@/components/ui/Wordmark';
import { LaneChipLink } from '@/components/ui/LaneChip';
import { Button } from '@/components/ui/Button';
import { SlidersIcon } from '@/components/ui/icons';

const githubUrl = 'https://github.com/lucasmsa/hiit-maker';

export function AppShell() {
  const t = useT();
  const { language, toggleLanguage, currentMode } = useShell();
  return (
    <div className="min-h-dvh bg-chalk text-ink">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink/10 bg-chalk/95 px-3 backdrop-blur sm:gap-5 sm:px-6">
        <Wordmark label={t('nav.home')} className="text-brand" />
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
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            aria-label={t('settings.language.switch')}
            className="px-3"
          >
            {language}
          </Button>
          <Link
            to="/settings"
            aria-label={t('nav.settings')}
            className="grid size-11 place-items-center rounded-button text-ink transition-colors duration-150 hover:bg-ink/10"
          >
            <SlidersIcon />
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center rounded-button px-3 font-bold text-ink transition-colors duration-150 hover:bg-ink/10 sm:inline-flex"
          >
            {t('nav.github')}
          </a>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
