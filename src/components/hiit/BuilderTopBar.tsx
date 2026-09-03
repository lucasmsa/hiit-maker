import { Wordmark } from '@/components/ui/Wordmark';
import { BuilderControls } from '@/components/hiit/BuilderControls';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';

interface BuilderTopBarProps {
  className?: string;
}

export function BuilderTopBar({ className }: BuilderTopBarProps) {
  const t = useT();
  return (
    <header className={cx('builder-topbar flex flex-col items-center gap-2 bg-brand px-4 pb-3 pt-4 text-white', className)}>
      <Wordmark label={t('nav.home')} className="builder-wordmark text-white" />
      <BuilderControls />
    </header>
  );
}
