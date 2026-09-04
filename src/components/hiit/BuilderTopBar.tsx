import { BrandRail } from '@/components/shell/BrandRail';
import { useShell } from '@/hooks/useShell';
import { cx } from '@/lib/cx';

interface BuilderTopBarProps {
  className?: string;
}

export function BuilderTopBar({ className }: BuilderTopBarProps) {
  const { languageLabel, toggleLanguage } = useShell();
  return (
    <BrandRail
      languageLabel={languageLabel}
      onToggleLanguage={toggleLanguage}
      className={cx(className)}
    />
  );
}
