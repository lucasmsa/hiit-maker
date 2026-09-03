import { BrandRail } from '@/components/shell/BrandRail';
import { CatalogRail, type CatalogRailProps } from '@/components/hiit/CatalogRail';
import { useShell } from '@/hooks/useShell';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';

interface BuilderRailProps extends Omit<CatalogRailProps, 'id' | 'onRail'> {
  className?: string;
}

export function BuilderRail({ className, ...catalog }: BuilderRailProps) {
  const t = useT();
  const { languageLabel, toggleLanguage } = useShell();
  return (
    <BrandRail
      currentMode="hiit"
      languageLabel={languageLabel}
      onToggleLanguage={toggleLanguage}
      className={cx('builder-rail', className)}
    >
      <a
        href="#workout-editor"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-white focus:px-3 focus:py-2 focus:font-bold focus:text-ink"
      >
        {t('hiit.builder.skipToSets')}
      </a>
      <div className="mt-2" aria-label={t('hiit.builder.catalog')}>
        <CatalogRail id="rail" onRail {...catalog} />
      </div>
    </BrandRail>
  );
}
