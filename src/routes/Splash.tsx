import type { CSSProperties } from 'react';
import { useT } from '@/hooks/useT';
import { useSplash } from '@/hooks/useSplash';
import { splashWordSize } from '@/lib/splash-word';

export function Splash() {
  const t = useT();
  const { chosen, choose, redirecting } = useSplash();
  if (redirecting) {
    return null;
  }
  const hiitWord = t('mode.hiit');
  const gymWord = t('mode.gym');
  return (
    <main className="splash" data-chosen={chosen ?? undefined}>
      <h1 className="sr-only">{t('splash.choose')}</h1>
      <button
        type="button"
        className="splash-panel"
        data-mode="hiit"
        onClick={() => choose('hiit')}
        disabled={chosen !== null}
      >
        <span className="splash-word" style={wordStyle(hiitWord)}>
          {hiitWord}
        </span>
        <span className="splash-copy">{t('splash.hiit.description')}</span>
      </button>
      <button
        type="button"
        className="splash-panel"
        data-mode="gym"
        onClick={() => choose('gym')}
        disabled={chosen !== null}
      >
        <span className="splash-word" style={wordStyle(gymWord)}>
          {gymWord}
        </span>
        <span className="splash-copy">{t('splash.gym.description')}</span>
      </button>
    </main>
  );
}

function wordStyle(word: string): CSSProperties {
  return {
    '--word-size': splashWordSize(word, 44, 12),
    '--word-size-narrow': splashWordSize(word, 88, 18),
  } as CSSProperties;
}
