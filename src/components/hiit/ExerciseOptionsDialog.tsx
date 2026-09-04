import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { ArrowDownIcon, ArrowUpIcon } from '@/components/hiit/HiitIcons';
import { useT } from '@/hooks/useT';
import { exerciseName } from '@/lib/hiit-summary';
import type { HiitSet, PlacedExercise } from '@/lib/types';

interface ExerciseOptionsDialogProps {
  exercise: PlacedExercise | null;
  set: HiitSet | null;
  allSets: HiitSet[];
  onClose: () => void;
  onMoveBy: (placedId: string, delta: -1 | 1) => void;
  onMoveToSet: (placedId: string, setId: string) => void;
  onRemove: (placedId: string) => void;
}

export function ExerciseOptionsDialog({
  exercise,
  set,
  allSets,
  onClose,
  onMoveBy,
  onMoveToSet,
  onRemove,
}: ExerciseOptionsDialogProps) {
  const t = useT();
  const name = exercise ? exerciseName(exercise.ref, t) : '';
  const index = exercise && set ? set.exercises.findIndex((candidate) => candidate.id === exercise.id) : -1;
  const setIndex = set ? allSets.findIndex((candidate) => candidate.id === set.id) : -1;
  const otherSets = allSets
    .map((candidate, candidateIndex) => ({
      id: candidate.id,
      label: t('hiit.builder.setTitle', { n: candidateIndex + 1 }),
    }))
    .filter((candidate) => candidate.id !== set?.id);

  return (
    <Dialog
      id="exercise-options"
      open={exercise !== null}
      onClose={onClose}
      title={t('hiit.builder.options', { name })}
    >
      {exercise && set ? (
        <div className="options-body">
          <p className="options-context">
            {t('hiit.builder.optionsPosition', {
              set: t('hiit.builder.setTitle', { n: setIndex + 1 }),
              index: index + 1,
              total: set.exercises.length,
            })}
          </p>

          <div className="options-group">
            <span id="options-order-label" className="settings-row-label">
              {t('hiit.builder.optionsOrder')}
            </span>
            <div role="group" aria-labelledby="options-order-label" className="options-pair">
              <Button
                variant="ghost"
                className="options-move"
                onClick={() => onMoveBy(exercise.id, -1)}
                disabled={index <= 0}
              >
                <ArrowUpIcon size={18} />
                {t('action.moveUp')}
              </Button>
              <Button
                variant="ghost"
                className="options-move"
                onClick={() => onMoveBy(exercise.id, 1)}
                disabled={index === -1 || index >= set.exercises.length - 1}
              >
                <ArrowDownIcon size={18} />
                {t('action.moveDown')}
              </Button>
            </div>
          </div>

          {otherSets.length > 0 && (
            <div className="options-group">
              <span id="options-move-label" className="settings-row-label">
                {t('hiit.builder.optionsMoveTo')}
              </span>
              <div role="group" aria-labelledby="options-move-label" className="flex flex-wrap gap-2">
                {otherSets.map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    className="pill pill-button options-set"
                    aria-label={t('hiit.builder.moveToSetN', { set: other.label })}
                    onClick={() => onMoveToSet(exercise.id, other.id)}
                  >
                    {other.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <hr className="options-divider" />

          <div className="options-danger">
            <Button variant="danger" onClick={() => onRemove(exercise.id)}>
              {t('action.remove')}
            </Button>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}
