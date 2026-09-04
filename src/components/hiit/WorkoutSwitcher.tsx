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
        <div className="switcher-body">
          {switcher.rows.length === 0 ? (
            <p className="options-context">{t('hiit.builder.switcher.empty')}</p>
          ) : (
            <>
              <p className="options-context">
                {t('hiit.builder.switcher.count', { count: switcher.rows.length })}
              </p>
              <ul className="switcher-list">
                {switcher.rows.map(({ workout, summary, current }) => (
                  <li key={workout.id} className="switcher-row" data-current={current} aria-current={current ? 'true' : undefined}>
                    <div className="switcher-head">
                      <span className="switcher-name">{workout.name}</span>
                      {current ? (
                        <LaneChip size="sm" tone="brand">
                          {t('hiit.builder.switcher.current')}
                        </LaneChip>
                      ) : null}
                    </div>
                    <p className="switcher-meta">
                      <span>{t('hiit.builder.setCount', { count: summary.setCount })}</span>
                      <span>{t('library.exerciseCount', { count: summary.exerciseCount })}</span>
                      <span className="switcher-time">{formatClock(summary.totalSeconds * 1000)}</span>
                      <span className="switcher-groups">
                        {summary.groups.map((group) => (
                          <span key={group}>
                            <MuscleIcon name={group} size={16} />
                            <span className="sr-only">{groupName(group, t)}</span>
                          </span>
                        ))}
                      </span>
                    </p>
                    <div className="switcher-actions">
                      {current ? (
                        <button type="button" className="pill pill-button" onClick={switcher.renameCurrent}>
                          {t('action.rename')}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="pill pill-button"
                          data-active="true"
                          onClick={() => switcher.select(workout.id)}
                        >
                          {t('hiit.builder.open')}
                        </button>
                      )}
                      <button
                        type="button"
                        className="pill pill-button"
                        onClick={() => switcher.duplicate(workout.id)}
                      >
                        {t('action.duplicate')}
                      </button>
                      <button
                        type="button"
                        className="pill pill-button pill-danger"
                        onClick={() => switcher.requestDelete(workout.id)}
                      >
                        {t('action.delete')}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          <hr className="options-divider" />

          <div className="options-danger">
            <Button onClick={switcher.createNew}>{t('hiit.builder.newWorkout')}</Button>
          </div>
        </div>
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
