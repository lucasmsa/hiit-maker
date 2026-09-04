import { Button } from '@/components/ui/Button';
import { LaneChip } from '@/components/ui/LaneChip';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { LinkButton } from '@/components/hiit/LinkButton';
import { useSharedWorkout } from '@/hooks/useSharedWorkout';
import { useT } from '@/hooks/useT';
import { formatClock } from '@/lib/digits';
import { exerciseName, groupName } from '@/lib/hiit-summary';

export function HiitShared() {
  const t = useT();
  const { workout, summary, save, open } = useSharedWorkout();

  if (!workout || !summary) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-7">{t('hiit.shared.title')}</h1>
        <p className="mt-4 text-3">{t('share.invalid')}</p>
        <LinkButton to="/" variant="secondary" className="mt-6">
          {t('hiit.builder.back')}
        </LinkButton>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <LaneChip tone="brand">{t('hiit.shared.title')}</LaneChip>
      <h1 className="mt-4 text-8">{workout.name}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-soft">
        <span>{t('hiit.builder.setCount', { count: summary.setCount })}</span>
        <span>{t('library.exerciseCount', { count: summary.exerciseCount })}</span>
        <span className="font-bold tabular-nums text-ink">{formatClock(summary.totalSeconds * 1000)}</span>
        {summary.groups.map((group) => (
          <span key={group} className="text-brand-deep">
            <MuscleIcon name={group} />
            <span className="sr-only">{groupName(group, t)}</span>
          </span>
        ))}
      </div>

      <ol className="mt-8 flex flex-col gap-5">
        {workout.sets.map((set, index) => (
          <li key={set.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <LaneChip size="sm">{t('hiit.builder.setTitle', { n: index + 1 })}</LaneChip>
              <span className="text-1 font-bold text-ink-soft">{set.loops}x</span>
            </div>
            <ul className="flex flex-col gap-1 pl-1">
              {set.exercises.map((placed) => (
                <li key={placed.id} className="flex items-baseline justify-between gap-3 border-b border-ink/10 py-1.5">
                  <span className="font-display text-4 font-extrabold">{exerciseName(placed.ref, t)}</span>
                  <span className="tabular-nums text-ink-soft">
                    {placed.trainSeconds}
                    {t('label.seconds')} / {placed.restSeconds}
                    {t('label.seconds')}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button size="lg" onClick={open}>
          {t('hiit.shared.open')}
        </Button>
        <Button size="lg" variant="secondary" onClick={save}>
          {t('hiit.shared.save')}
        </Button>
      </div>
    </main>
  );
}
