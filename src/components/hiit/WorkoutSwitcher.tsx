import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { LaneChip } from '@/components/ui/LaneChip';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import type { WorkoutSwitcherApi } from '@/hooks/useWorkoutSwitcher';
import { useT } from '@/hooks/useT';
import { formatClock } from '@/lib/digits';
import { groupName } from '@/lib/hiit-summary';

interface WorkoutSwitcherProps {
  switcher: WorkoutSwitcherApi;
}

export function WorkoutSwitcher({ switcher }: WorkoutSwitcherProps) {
  const t = useT();
  return (
    <>
      <Dialog id="workout-switcher" open={switcher.open} onClose={switcher.close} title={t('hiit.builder.workouts')}>
        <Button onClick={switcher.createNew} className="mb-4">
          {t('hiit.builder.newWorkout')}
        </Button>
        {switcher.rows.length === 0 ? (
          <p className="text-ink-soft">{t('hiit.builder.switcher.empty')}</p>
        ) : (
          <ul className="flex flex-col divide-y divide-paper-dim">
            {switcher.rows.map(({ workout, summary, current }) => (
              <li key={workout.id} className="flex flex-col gap-2 py-3" aria-current={current ? 'true' : undefined}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-3 font-semibold">{workout.name}</span>
                  {current ? (
                    <LaneChip size="sm" tone="brand">
                      {t('hiit.builder.switcher.current')}
                    </LaneChip>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-1 text-ink-soft">
                  <span>{t('hiit.builder.setCount', { count: summary.setCount })}</span>
                  <span>{t('library.exerciseCount', { count: summary.exerciseCount })}</span>
                  <span className="font-bold tabular-nums text-ink">{formatClock(summary.totalSeconds * 1000)}</span>
                  <span className="flex items-center gap-1 text-brand">
                    {summary.groups.map((group) => (
                      <span key={group}>
                        <MuscleIcon name={group} size={16} />
                        <span className="sr-only">{groupName(group, t)}</span>
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {current ? (
                    <Button variant="ghost" onClick={switcher.renameCurrent}>
                      {t('action.rename')}
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={() => switcher.select(workout.id)}>
                      {t('hiit.builder.open')}
                    </Button>
                  )}
                  <Button variant="ghost" onClick={() => switcher.duplicate(workout.id)}>
                    {t('action.duplicate')}
                  </Button>
                  <Button variant="ghost" onClick={() => switcher.requestDelete(workout.id)} className="text-brand-deep">
                    {t('action.delete')}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Dialog>

      <Dialog
        id="delete-workout"
        open={switcher.deleting !== null}
        onClose={switcher.cancelDelete}
        title={t('hiit.builder.deleteTitle')}
      >
        <p>{t('hiit.builder.deleteBody', { name: switcher.deleting?.name ?? '' })}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={switcher.cancelDelete}>
            {t('action.cancel')}
          </Button>
          <Button variant="danger" onClick={switcher.confirmDelete}>
            {t('action.delete')}
          </Button>
        </div>
      </Dialog>
    </>
  );
}
