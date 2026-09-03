import { Link } from 'react-router';
import { useT } from '@/hooks/useT';

const linkClass =
  'inline-flex h-11 items-center rounded-button bg-ink px-4 font-bold text-white transition-colors duration-150 hover:bg-black';

export function NotFound() {
  const t = useT();
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6">
      <h1 className="text-9 text-brand">{t('notFound.title')}</h1>
      <p className="max-w-[52ch] text-3">{t('notFound.body')}</p>
      <div className="flex flex-wrap gap-3">
        <Link to="/hiit" className={linkClass}>
          {t('notFound.hiit')}
        </Link>
        <Link to="/gym" className={linkClass}>
          {t('notFound.gym')}
        </Link>
      </div>
    </main>
  );
}
