import { Outlet } from 'react-router';
import { useShell } from '@/hooks/useShell';
import { BrandRail } from '@/components/shell/BrandRail';

export function AppShell() {
  const { languageLabel, toggleLanguage } = useShell();
  return (
    <div className="min-h-dvh bg-paper text-ink lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <BrandRail
        languageLabel={languageLabel}
        onToggleLanguage={toggleLanguage}
      />
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
