import type { ReactNode } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useT } from '@/hooks/useT';
import { defaultBounds } from '@/lib/settings-bounds';
import type { Defaults, Language } from '@/lib/types';
import { cx } from '@/lib/cx';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { NumberField } from '@/components/ui/Field';
import { LaneChip } from '@/components/ui/LaneChip';
import { Toggle } from '@/components/ui/Toggle';

const repoUrl = 'https://github.com/lucasmsa/hiit-maker';
const decisionsUrl = `${repoUrl}/tree/dev/docs/adr`;
const photoCreditsUrl = `${repoUrl}/blob/dev/public/exercises/ATTRIBUTION.md`;

const secondFields: Array<Exclude<keyof Defaults, 'setRepetitions'>> = [
  'warmupSeconds',
  'trainSeconds',
  'restSeconds',
  'setRestSeconds',
];

const fieldLabelKey = {
  warmupSeconds: 'settings.defaults.warmup',
  trainSeconds: 'settings.defaults.train',
  restSeconds: 'settings.defaults.rest',
  setRestSeconds: 'settings.defaults.setRest',
  setRepetitions: 'settings.defaults.setRepetitions',
} as const;

const languages: Language[] = ['en', 'pt-BR'];
const languageLabelKey = { en: 'settings.language.en', 'pt-BR': 'settings.language.pt-BR' } as const;

export function Settings() {
  const t = useT();
  const {
    settings,
    setDefault,
    setLanguage,
    setSoundEnabled,
    resetSettings,
    confirmOpen,
    openConfirm,
    closeConfirm,
    deleteAllData,
    version,
  } = useSettings();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-8">{t('settings.title')}</h1>
        <p className="max-w-[60ch] text-ink-soft">{t('settings.intro')}</p>
      </header>

      <Section id="defaults" title={t('settings.defaults')}>
        <div className="grid gap-5 sm:grid-cols-2">
          {secondFields.map((key) => (
            <NumberField
              key={key}
              id={`default-${key}`}
              label={t(fieldLabelKey[key])}
              value={settings.defaults[key]}
              onChange={(next) => setDefault(key, next)}
              min={defaultBounds[key].min}
              max={defaultBounds[key].max}
              step={defaultBounds[key].step}
              unit={t('settings.seconds')}
            />
          ))}
          <NumberField
            id="default-setRepetitions"
            label={t(fieldLabelKey.setRepetitions)}
            value={settings.defaults.setRepetitions}
            onChange={(next) => setDefault('setRepetitions', next)}
            min={defaultBounds.setRepetitions.min}
            max={defaultBounds.setRepetitions.max}
            step={defaultBounds.setRepetitions.step}
          />
        </div>
      </Section>

      <Section id="language" title={t('settings.language')}>
        <div role="group" aria-label={t('settings.language')} className="flex flex-wrap gap-2">
          {languages.map((language) => {
            const active = settings.language === language;
            return (
              <button
                key={language}
                type="button"
                aria-pressed={active}
                onClick={() => setLanguage(language)}
                className={cx(
                  'h-11 rounded-button border-2 px-4 font-bold transition-colors duration-150',
                  active ? 'border-ink bg-ink text-white' : 'border-ink/20 bg-white text-ink hover:border-ink',
                )}
              >
                {t(languageLabelKey[language])}
              </button>
            );
          })}
        </div>
      </Section>

      <Section id="sound" title={t('settings.sound.title')}>
        <Toggle
          id="sound-cues"
          label={t('settings.sound')}
          checked={!settings.muted}
          onChange={setSoundEnabled}
        />
        <p className="text-1 text-ink-soft">{t('settings.sound.hint')}</p>
      </Section>

      <Section id="units" title={t('settings.units')}>
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold">{t('settings.units.weight')}</span>
          <span className="rounded-button bg-ink/10 px-3 py-1.5 font-bold">{t('settings.units.kg')}</span>
        </div>
      </Section>

      <Section id="data" title={t('settings.data')}>
        <DataRow hint={t('settings.data.resetHint')}>
          <Button variant="secondary" onClick={resetSettings}>
            {t('settings.data.reset')}
          </Button>
        </DataRow>
        <DataRow hint={t('settings.data.deleteAllHint')}>
          <Button variant="danger" onClick={openConfirm}>
            {t('settings.data.deleteAll')}
          </Button>
        </DataRow>
      </Section>

      <Section id="about" title={t('settings.about')}>
        <p className="text-ink-soft">{t('settings.about.version', { version })}</p>
        <ul className="flex flex-col gap-2">
          <li>
            <ExternalLink href={repoUrl}>{t('settings.about.source')}</ExternalLink>
          </li>
          <li>
            <ExternalLink href={decisionsUrl}>{t('settings.about.decisions')}</ExternalLink>
          </li>
          <li>
            <ExternalLink href={photoCreditsUrl}>{t('settings.about.photoCredits')}</ExternalLink>
          </li>
        </ul>
      </Section>

      <Dialog id="delete-all" open={confirmOpen} onClose={closeConfirm} title={t('settings.data.confirmTitle')}>
        <p className="mb-6 max-w-[48ch]">{t('settings.data.confirmBody')}</p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="ghost" onClick={closeConfirm}>
            {t('action.cancel')}
          </Button>
          <Button variant="danger" onClick={deleteAllData}>
            {t('settings.data.confirmAction')}
          </Button>
        </div>
      </Dialog>
    </main>
  );
}

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

function Section({ id, title, children }: SectionProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="flex flex-col gap-5">
      <h2 id={`${id}-title`} className="self-start">
        <LaneChip>{title}</LaneChip>
      </h2>
      {children}
    </section>
  );
}

interface DataRowProps {
  hint: string;
  children: ReactNode;
}

function DataRow({ hint, children }: DataRowProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="max-w-[52ch] text-ink-soft">{hint}</p>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-bold text-brand-deep underline decoration-2 underline-offset-4 hover:text-ink"
    >
      {children}
    </a>
  );
}
