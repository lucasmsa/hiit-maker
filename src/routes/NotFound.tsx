import { Link } from 'react-router';
import { useT } from '@/hooks/useT';

export function NotFound() {
  const t = useT();
  return (
    <main className="px-4 py-10 sm:px-8">
      <section className="card mx-auto w-full max-w-[590px] px-6 py-10 text-center sm:px-10">
        <h1 className="card-title">{t('notFound.title')}</h1>
        <p className="mx-auto mt-4 max-w-[44ch] text-ink-soft">{t('notFound.body')}</p>
        <div className="mt-8 flex justify-center">
          <Link to="/" className="text-link-red">
            {t('notFound.home')}
          </Link>
        </div>
      </section>
    </main>
  );
}
