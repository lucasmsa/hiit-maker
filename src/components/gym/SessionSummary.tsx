import { Link } from 'react-router';
import type { SessionSummaryData } from '@/hooks/useGymSession';
import { formatDuration, formatWeight } from '@/lib/gym-format';
import type { Translate } from '@/lib/i18n';

interface SessionSummaryProps {
  summary: SessionSummaryData;
  backTo: string;
  t: Translate;
  onBack: () => void;
}

export function SessionSummary({ summary, backTo, t, onBack }: SessionSummaryProps) {
  const stats: Array<{ label: string; value: string }> = [
    { label: t('gym.run.setsDone'), value: String(summary.setsDone) },
    { label: t('gym.run.volume'), value: `${formatWeight(summary.volumeKg)} ${t('unit.kg')}` },
    { label: t('gym.run.duration'), value: formatDuration(summary.durationMs) },
  ];
  return (
    <section className="card mx-auto w-full max-w-[590px] overflow-hidden">
      <div className="px-6 pt-8 sm:px-10">
        <h1 className="card-title text-go">{t('run.finished.gym')}</h1>
        <dl className="mt-8 flex flex-col">
          {stats.map((stat) => (
            <div key={stat.label} className="settings-row">
              <dt className="settings-row-label">{stat.label}</dt>
              <dd className="pill m-0">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className="my-8 text-center">
          <Link to={backTo} onClick={onBack} className="text-link-red">
            {t('gym.run.backToRoutine')}
          </Link>
        </div>
      </div>
      <p className="black-pill w-full rounded-none rounded-b-tile">
        {t('gym.run.doneCount', { done: summary.setsDone })}
      </p>
    </section>
  );
}
