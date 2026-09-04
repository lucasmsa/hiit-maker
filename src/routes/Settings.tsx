import type { ReactNode } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useT } from '@/hooks/useT';
import { defaultBounds } from '@/lib/settings-bounds';
import type { Defaults, Language } from '@/lib/types';
import { splitHighlight } from '@/lib/highlight';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { PillNumber } from '@/components/ui/PillNumber';
import { Toggle } from '@/components/ui/Toggle';
import { ChevronLeftIcon, GearIcon } from '@/components/shell/shell-icons';

const repoUrl = 'https://github.com/lucasmsa/hiit-maker';
const creditsUrl = `${repoUrl}/blob/dev/public/exercises/ATTRIBUTION.md`;

const rows = [
  { key: 'warmupSeconds', row: 'settings.row.warmup', label: 'settings.defaults.warmup' },
  { key: 'trainSeconds', row: 'settings.row.train', label: 'settings.defaults.train' },
  { key: 'restSeconds', row: 'settings.row.rest', label: 'settings.defaults.rest' },
  { key: 'setRestSeconds', row: 'settings.row.setRest', label: 'settings.defaults.setRest' },
  {
    key: 'setRepetitions',
    row: 'settings.row.setRepetitions',
    label: 'settings.defaults.setRepetitions',
  },
] as const satisfies ReadonlyArray<{ key: keyof Defaults; row: string; label: string }>;

const languages: Language[] = ['en', 'pt-BR'];
const languageLabelKey = { en: 'settings.language.en', 'pt-BR': 'settings.language.pt-BR' } as const;

export function Settings() {
  const t = useT();
  const s = useSettings();

  return (
    <main className="px-4 py-6 sm:px-8 sm:py-8">
      <button type="button" onClick={s.back} className="back-link">
        <span className="back-link-circle">
          <ChevronLeftIcon size={20} />
        </span>
        {t('nav.back')}
      </button>

      <section aria-labelledby="settings-title" className="card mx-auto mt-6 w-full max-w-[590px]">
        <div className="px-6 pt-7 sm:px-10">
          <h1 id="settings-title" className="card-title">
            <GearIcon />
            {t('settings.title')}
          </h1>
          <p className="mt-3 text-center text-1 text-ink-soft">{t('settings.intro')}</p>

          <ul className="mt-8 flex flex-col">
            {rows.map((row) => (
              <li key={row.key} className="settings-row">
                <RowLabel template={t(row.row)} />
                <PillNumber
                  id={`default-${row.key}`}
                  label={t(row.label)}
                  value={s.draft.defaults[row.key]}
                  onChange={(next) => s.setDefault(row.key, next)}
                  min={defaultBounds[row.key].min}
                  max={defaultBounds[row.key].max}
                  step={defaultBounds[row.key].step}
                  unit={row.key === 'setRepetitions' ? t('label.reps') : t('settings.seconds')}
                />
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center">
            <button type="button" onClick={s.restore} className="text-link-red">
              {t('settings.restore')}
            </button>
          </div>

          <hr className="my-8 border-0 border-t border-paper-dim" />

          <div className="settings-row">
            <span id="language-label" className="settings-row-label">
              {t('settings.language')}
            </span>
            <div role="group" aria-labelledby="language-label" className="flex flex-wrap justify-end gap-2">
              {languages.map((language) => {
                const active = s.settings.language === language;
                return (
                  <button
                    key={language}
                    type="button"
                    aria-pressed={active}
                    data-active={active}
                    onClick={() => s.setLanguage(language)}
                    className="pill pill-button"
                  >
                    {t(languageLabelKey[language])}
                  </button>
                );
              })}
            </div>
          </div>

          <Toggle
            id="sound-cues"
            label={t('settings.sound')}
            checked={!s.draft.muted}
            onChange={s.setSoundEnabled}
            className="settings-row settings-toggle"
          />
          <p className="-mt-2 text-1 text-ink-soft">{t('settings.sound.hint')}</p>

          <hr className="my-8 border-0 border-t border-paper-dim" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="max-w-[44ch] text-1 text-ink-soft">{t('settings.data.deleteAllHint')}</p>
            <button type="button" onClick={s.openConfirm} className="text-link-red shrink-0">
              {t('settings.data.deleteAll')}
            </button>
          </div>

          <div className="mt-8 mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-1 text-ink-soft">
            <span>{t('settings.about.version', { version: s.version })}</span>
            <ExternalLink href={repoUrl}>{t('settings.about.source')}</ExternalLink>
            <ExternalLink href={creditsUrl}>{t('settings.about.credits')}</ExternalLink>
          </div>
        </div>

        <button
          type="button"
          onClick={s.save}
          disabled={!s.dirty}
          data-dirty={s.dirty}
          className="save-bar"
        >
          {t('settings.save')}
        </button>
      </section>

      <Dialog
        id="discard-changes"
        open={s.discardOpen}
        onClose={s.keepEditing}
        title={t('settings.discardTitle')}
      >
        <p className="mb-6 max-w-[48ch]">{t('settings.discardBody')}</p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="ghost" onClick={s.keepEditing}>
            {t('settings.keepEditing')}
          </Button>
          <Button variant="danger" onClick={s.discard}>
            {t('settings.discard')}
          </Button>
        </div>
      </Dialog>

      <Dialog
        id="delete-all"
        open={s.confirmOpen}
        onClose={s.closeConfirm}
        title={t('settings.data.confirmTitle')}
      >
        <p className="mb-6 max-w-[48ch]">{t('settings.data.confirmBody')}</p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="ghost" onClick={s.closeConfirm}>
            {t('action.cancel')}
          </Button>
          <Button variant="danger" onClick={s.deleteAllData}>
            {t('settings.data.confirmAction')}
          </Button>
        </div>
      </Dialog>
    </main>
  );
}

function RowLabel({ template }: { template: string }) {
  const [before, highlight, after] = splitHighlight(template);
  return (
    <span className="settings-row-label">
      {before}
      {highlight ? <em>{highlight}</em> : null}
      {after}
    </span>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-bold text-brand underline decoration-2 underline-offset-4 hover:text-brand-deep"
    >
      {children}
    </a>
  );
}
