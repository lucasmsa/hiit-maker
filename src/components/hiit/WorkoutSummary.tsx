import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Digits } from '@/components/ui/Digits';
import { BodyMap } from '@/components/hiit/BodyMap';
import { LinkIcon } from '@/components/hiit/HiitIcons';
import { ClockIcon, RunnerIcon, TargetIcon } from '@/components/hiit/OriginalIcons';
import { PlayButton } from '@/components/hiit/PlayButton';
import type { CopyState } from '@/hooks/useCopyLink';
import { useT } from '@/hooks/useT';
import { formatClock } from '@/lib/digits';
import type { WorkoutSummary as Summary } from '@/lib/hiit-summary';
import type { HiitGroup } from '@/lib/types';

interface WorkoutSummaryProps {
  workoutId: string;
  summary: Summary;
  counts: Partial<Record<HiitGroup, number>>;
  share: { state: CopyState; url: string; copy: () => void };
}

const totalStyle = { '--digits-size': '3rem', fontWeight: 600 } as CSSProperties;

export function WorkoutSummary({ workoutId, summary, counts, share }: WorkoutSummaryProps) {
  const t = useT();
  const canStart = summary.exerciseCount > 0;
  const runPath = `/w/${workoutId}/run`;
  return (
    <div className="flex flex-col gap-7">
      <section className="flex flex-col items-center gap-5" aria-label={t('label.targetMuscles')}>
        <h2 className="summary-chip">
          <TargetIcon size={26} />
          {t('label.targetMuscles')}
        </h2>
        <BodyMap counts={counts} />
      </section>

      <section className="flex flex-col items-center gap-3" aria-label={t('label.totalTime')}>
        <h2 className="summary-chip">
          <ClockIcon size={28} />
          {t('label.totalTime')}
        </h2>
        <Digits
          value={formatClock(summary.totalSeconds * 1000)}
          label={t('label.totalTime')}
          className="text-brand"
          style={totalStyle}
        />
        <p className="text-1 text-ink-soft">
          {t('hiit.builder.setCount', { count: summary.setCount })}, {t('library.exerciseCount', { count: summary.exerciseCount })}
        </p>
      </section>

      <div className="flex flex-col items-center gap-8">
        {canStart ? (
          <Link to={runPath} className="summary-chip" data-tone="brand">
            <RunnerIcon size={28} />
            {t('hiit.builder.startNow')}
          </Link>
        ) : (
          <span className="summary-chip" data-tone="brand" data-disabled="true" aria-disabled="true">
            <RunnerIcon size={28} />
            {t('hiit.builder.startNow')}
          </span>
        )}
        <PlayButton to={runPath} label={t('hiit.builder.startNow')} disabled={!canStart} />
        <Button variant="ghost" onClick={share.copy} disabled={!canStart} className="text-ink-soft">
          <LinkIcon size={18} />
          {share.state === 'copied' ? t('share.copied') : t('hiit.builder.shareLink')}
        </Button>
        {share.state === 'failed' ? (
          <div className="flex w-full flex-col gap-1 px-6 text-1">
            <p className="font-bold text-brand-deep">{t('hiit.builder.copyFailed')}</p>
            <input readOnly value={share.url} className="w-full rounded-button border-2 border-ink/20 bg-white px-2 py-1 text-1" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
