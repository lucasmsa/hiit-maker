import { Wordmark } from '@/components/ui/Wordmark';
import { BuilderControls } from '@/components/hiit/BuilderControls';
import { CatalogRail, type CatalogRailProps } from '@/components/hiit/CatalogRail';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';

interface BuilderRailProps extends Omit<CatalogRailProps, 'id' | 'onRail'> {
  className?: string;
}

export function BuilderRail({ className, ...catalog }: BuilderRailProps) {
  const t = useT();
  return (
    <aside className={cx('builder-rail no-scrollbar px-4 pb-10 pt-6', className)} aria-label={t('hiit.builder.catalog')}>
      <a
        href="#workout-editor"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-white focus:px-3 focus:py-2 focus:font-bold focus:text-ink"
      >
        {t('hiit.builder.skipToSets')}
      </a>
      <div className="flex justify-center">
        <Wordmark label={t('nav.home')} className="builder-wordmark text-white" />
      </div>
      <BuilderControls className="mt-4" />
      <div className="mt-6">
        <CatalogRail id="rail" onRail {...catalog} />
      </div>
    </aside>
  );
}
