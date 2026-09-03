import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
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
  const otherSets = allSets
    .map((candidate, candidateIndex) => ({ id: candidate.id, label: t('hiit.builder.setTitle', { n: candidateIndex + 1 }) }))
    .filter((candidate) => candidate.id !== set?.id);

  return (
    <Dialog id="exercise-options" open={exercise !== null} onClose={onClose} title={t('hiit.builder.options', { name })}>
      {exercise && set ? (
        <div className="flex flex-col gap-2">
          <Button variant="secondary" onClick={() => onMoveBy(exercise.id, -1)} disabled={index <= 0}>
            {t('action.moveUp')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => onMoveBy(exercise.id, 1)}
            disabled={index === -1 || index >= set.exercises.length - 1}
          >
            {t('action.moveDown')}
          </Button>
          {otherSets.map((other) => (
            <Button key={other.id} variant="ghost" onClick={() => onMoveToSet(exercise.id, other.id)}>
              {t('hiit.builder.moveToSetN', { set: other.label })}
            </Button>
          ))}
          <Button variant="danger" onClick={() => onRemove(exercise.id)} className="mt-2">
            {t('action.remove')}
          </Button>
        </div>
      ) : null}
    </Dialog>
  );
}
