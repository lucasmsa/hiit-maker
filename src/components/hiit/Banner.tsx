import { DumbbellIcon } from '@/components/hiit/OriginalIcons';
import { useT } from '@/hooks/useT';

export function Banner() {
  const t = useT();
  return (
    <div className="banner">
      <DumbbellIcon size={40} />
      <span>{t('hiit.builder.banner')}</span>
    </div>
  );
}
