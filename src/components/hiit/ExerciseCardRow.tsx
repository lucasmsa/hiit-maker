import { Reorder, useDragControls } from 'motion/react';
import { IconButton } from '@/components/ui/IconButton';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { DeleteIcon, MoreIcon } from '@/components/hiit/OriginalIcons';
import { PillNumber } from '@/components/hiit/PillNumber';
import { useT } from '@/hooks/useT';
import { exerciseName, groupOf, photoOf } from '@/lib/hiit-summary';
import type { PlacedExercise } from '@/lib/types';

interface ExerciseCardRowProps {
  placed: PlacedExercise;
  flashing: boolean;
  onTrain: (seconds: number) => void;
  onRest: (seconds: number) => void;
  onRemove: () => void;
  onOptions: () => void;
}

export function ExerciseCardRow({ placed, flashing, onTrain, onRest, onRemove, onOptions }: ExerciseCardRowProps) {
  const t = useT();
  const controls = useDragControls();
  const name = exerciseName(placed.ref, t);
  const photo = photoOf(placed.ref);
  const group = groupOf(placed.ref);

  return (
    <Reorder.Item
      as="li"
      value={placed}
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.02, zIndex: 10, boxShadow: 'var(--shadow-lift)' }}
      className="exercise-row bg-white"
      data-flash={flashing}
    >
      <button
        type="button"
        aria-label={`${t('hiit.builder.drag')}: ${name}`}
        onPointerDown={(event) => controls.start(event)}
        className="cursor-grab touch-none rounded-[10px] active:cursor-grabbing"
      >
        {photo ? (
          <img src={`/exercises/${photo}-480.webp`} alt="" width={100} height={90} loading="lazy" />
        ) : (
          <span className="grid h-[90px] w-[100px] place-items-center rounded-[10px] bg-paper-dim text-brand">
            {group ? <MuscleIcon name={group} size={48} /> : <span className="font-display text-5 font-bold">{name.slice(0, 1)}</span>}
          </span>
        )}
      </button>
      <div className="flex min-w-0 flex-col gap-3 pt-1">
        <span className="truncate font-body text-2 font-medium">{name}</span>
        <div className="flex flex-wrap gap-6">
          <PillNumber
            id={`placed-${placed.id}-train`}
            label={t('label.train')}
            value={placed.trainSeconds}
            onChange={onTrain}
            min={5}
            max={600}
            unit={t('label.seconds')}
          />
          <PillNumber
            id={`placed-${placed.id}-rest`}
            label={t('label.rest')}
            value={placed.restSeconds}
            onChange={onRest}
            min={0}
            max={600}
            unit={t('label.seconds')}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <IconButton label={`${t('action.remove')}: ${name}`} onClick={onRemove} tone="brand">
          <DeleteIcon size={22} />
        </IconButton>
        <IconButton label={t('hiit.builder.options', { name })} onClick={onOptions}>
          <MoreIcon size={20} />
        </IconButton>
      </div>
    </Reorder.Item>
  );
}
