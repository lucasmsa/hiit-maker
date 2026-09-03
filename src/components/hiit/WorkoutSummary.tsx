import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Digits } from '@/components/ui/Digits';
import { LaneChip } from '@/components/ui/LaneChip';
import { BodyMap } from '@/components/hiit/BodyMap';
import { LinkIcon, PlayIcon } from '@/components/hiit/HiitIcons';
import { LinkButton } from '@/components/hiit/LinkButton';
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

const totalStyle = { '--digits-size': 'var(--text-8)' } as CSSProperties;

export function WorkoutSummary({ workoutId, summary, counts, share }: WorkoutSummaryProps) {
  const t = useT();
  const canStart = summary.exerciseCount > 0;
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4" aria-label={t('label.targetMuscles')}>
        <LaneChip>{t('label.targetMuscles')}</LaneChip>
        <BodyMap counts={counts} />
      </section>

      <section className="flex flex-col gap-3" aria-label={t('label.totalTime')}>
        <LaneChip>{t('label.totalTime')}</LaneChip>
        <Digits
          value={formatClock(summary.totalSeconds * 1000)}
          label={t('label.totalTime')}
          className="text-brand-deep"
          style={totalStyle}
        />
        <p className="text-ink-soft">
          {t('hiit.library.setCount', { count: summary.setCount })}, {t('library.exerciseCount', { count: summary.exerciseCount })}
        </p>
      </section>

      <div className="flex flex-col gap-3">
        {canStart ? (
          <LinkButton to={`/hiit/${workoutId}/run`} size="lg" className="w-full">
            <PlayIcon />
            {t('hiit.builder.start')}
          </LinkButton>
        ) : (
          <Button size="lg" disabled className="w-full">
            <PlayIcon />
            {t('hiit.builder.start')}
          </Button>
        )}
        <Button variant="secondary" onClick={share.copy} disabled={!canStart}>
          <LinkIcon />
          {share.state === 'copied' ? t('share.copied') : t('hiit.builder.shareLink')}
        </Button>
        {share.state === 'failed' ? (
          <div className="flex flex-col gap-1 text-1">
            <p className="font-bold text-brand-deep">{t('hiit.builder.copyFailed')}</p>
            <input readOnly value={share.url} className="w-full rounded-button border-2 border-ink/20 bg-white px-2 py-1 text-1" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
