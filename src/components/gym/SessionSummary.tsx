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
    <section className="flex flex-col gap-8">
      <h1 className="text-8 text-recover">{t('run.finished.gym')}</h1>
      <dl className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 border-t-4 border-ink pt-3">
            <dt className="text-2 font-bold text-ink-soft">{stat.label}</dt>
            <dd className="font-display text-8 font-black leading-none">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <Link
        to={backTo}
        onClick={onBack}
        className="inline-flex h-14 w-fit items-center rounded-button bg-ink px-6 font-bold text-3 text-white hover:bg-black"
      >
        {t('gym.run.backToRoutine')}
      </Link>
    </section>
  );
}
