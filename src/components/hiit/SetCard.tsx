import { Reorder } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { MinusIcon, PlusIcon } from '@/components/ui/icons';
import { ExerciseCardRow } from '@/components/hiit/ExerciseCardRow';
import { ResetArrowIcon } from '@/components/hiit/OriginalIcons';
import { PillNumber } from '@/components/hiit/PillNumber';
import { useT } from '@/hooks/useT';
import type { HiitSet } from '@/lib/types';

interface SetCardProps {
  set: HiitSet;
  index: number;
  flashId: string | null;
  showAddExercise: boolean;
  onClear: () => void;
  onLoops: (loops: number) => void;
  onSetRest: (seconds: number) => void;
  onAddExercise: () => void;
  onTrain: (placedId: string, seconds: number) => void;
  onRest: (placedId: string, seconds: number) => void;
  onRemoveExercise: (placedId: string) => void;
  onReorder: (orderedIds: string[]) => void;
  onOptions: (placedId: string) => void;
}

export function SetCard({
  set,
  index,
  flashId,
  showAddExercise,
  onClear,
  onLoops,
  onSetRest,
  onAddExercise,
  onTrain,
  onRest,
  onRemoveExercise,
  onReorder,
  onOptions,
}: SetCardProps) {
  const t = useT();
  const title = t('hiit.builder.setTitle', { n: index + 1 });

  return (
    <section aria-label={title} className="set-card">
      <header className="relative px-6 pt-6">
        <h2 className="set-title">{title}</h2>
        <IconButton
          label={`${t('hiit.builder.clearSet')}: ${title}`}
          onClick={onClear}
          tone="brand"
          className="absolute right-4 top-4"
          disabled={set.exercises.length === 0}
        >
          <ResetArrowIcon size={26} />
        </IconButton>
      </header>

      <div className="flex flex-1 flex-col gap-6 py-6">
        {set.exercises.length === 0 ? (
          <p className="px-6 text-center text-3 text-ink-soft">{t('hiit.builder.emptySet')}</p>
        ) : (
          <Reorder.Group
            as="ul"
            axis="y"
            values={set.exercises}
            onReorder={(items) => onReorder(items.map((item) => item.id))}
            className="flex flex-col gap-5"
          >
            {set.exercises.map((placed) => (
              <ExerciseCardRow
                key={placed.id}
                placed={placed}
                flashing={flashId === placed.id}
                onTrain={(seconds) => onTrain(placed.id, seconds)}
                onRest={(seconds) => onRest(placed.id, seconds)}
                onRemove={() => onRemoveExercise(placed.id)}
                onOptions={() => onOptions(placed.id)}
              />
            ))}
          </Reorder.Group>
        )}
        {showAddExercise ? (
          <Button variant="secondary" onClick={onAddExercise} className="mx-auto">
            {t('hiit.builder.addExercise')}
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col items-center gap-1 px-6 pb-6">
        <PillNumber
          id={`set-${set.id}-rest`}
          label={t('label.setRest')}
          value={set.setRestSeconds}
          onChange={onSetRest}
          min={0}
          max={600}
          unit={t('label.seconds')}
          className="items-center"
        />
      </div>

      <div className="reps-bar">
        <button type="button" aria-label={t('hiit.builder.increaseReps')} onClick={() => onLoops(set.loops + 1)}>
          <PlusIcon />
        </button>
        <span>{t('hiit.builder.setRepetitions', { count: set.loops })}</span>
        <button
          type="button"
          aria-label={t('hiit.builder.decreaseReps')}
          onClick={() => onLoops(set.loops - 1)}
          disabled={set.loops <= 1}
        >
          <MinusIcon />
        </button>
      </div>
    </section>
  );
}
