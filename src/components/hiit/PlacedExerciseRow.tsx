import { Reorder, useDragControls } from 'motion/react';
import { NumberField } from '@/components/ui/Field';
import { IconButton } from '@/components/ui/IconButton';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { ArrowDownIcon, ArrowUpIcon, GripIcon, TrashIcon } from '@/components/hiit/HiitIcons';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';
import { exerciseName, groupOf, photoOf } from '@/lib/hiit-summary';
import type { HiitSet, PlacedExercise } from '@/lib/types';

interface PlacedExerciseRowProps {
  placed: PlacedExercise;
  set: HiitSet;
  index: number;
  otherSets: Array<{ id: string; label: string }>;
  flashing: boolean;
  onTrain: (seconds: number) => void;
  onRest: (seconds: number) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveToSet: (setId: string) => void;
}

export function PlacedExerciseRow({
  placed,
  set,
  index,
  otherSets,
  flashing,
  onTrain,
  onRest,
  onRemove,
  onMoveUp,
  onMoveDown,
  onMoveToSet,
}: PlacedExerciseRowProps) {
  const t = useT();
  const controls = useDragControls();
  const name = exerciseName(placed.ref, t);
  const photo = photoOf(placed.ref);
  const group = groupOf(placed.ref);
  const selectId = `placed-${placed.id}-move`;

  return (
    <Reorder.Item
      as="li"
      value={placed}
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.02, zIndex: 10 }}
      className={cx(
        'relative grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-3 rounded-button border border-ink/10 p-3 transition-colors duration-500 sm:grid-cols-[auto_auto_minmax(0,1fr)_auto]',
        flashing ? 'bg-brand-soft' : 'bg-white',
      )}
    >
      <button
        type="button"
        aria-label={t('hiit.builder.drag')}
        onPointerDown={(event) => controls.start(event)}
        className="grid size-11 shrink-0 cursor-grab touch-none place-items-center rounded-button text-ink-soft hover:bg-ink/10 active:cursor-grabbing"
      >
        <GripIcon />
      </button>
      {photo ? (
        <img
          src={`/exercises/${photo}-480.webp`}
          alt=""
          width={80}
          height={60}
          loading="lazy"
          className="h-[60px] w-20 shrink-0 rounded-tile object-cover"
        />
      ) : (
        <span className="grid h-[60px] w-20 shrink-0 place-items-center rounded-tile bg-ink text-brand-soft">
          {group ? <MuscleIcon name={group} /> : <span className="font-display text-4 font-extrabold">{name.slice(0, 1)}</span>}
        </span>
      )}
      <span className="min-w-0 font-display text-4 font-extrabold leading-none">{name}</span>
      <div className="col-span-3 flex flex-wrap items-center justify-end gap-1 sm:col-span-1">
        <IconButton label={`${t('action.moveUp')}: ${name}`} onClick={onMoveUp} disabled={index === 0}>
          <ArrowUpIcon />
        </IconButton>
        <IconButton
          label={`${t('action.moveDown')}: ${name}`}
          onClick={onMoveDown}
          disabled={index === set.exercises.length - 1}
        >
          <ArrowDownIcon />
        </IconButton>
        {otherSets.length > 0 ? (
          <label className="flex items-center gap-1 text-1 font-bold text-ink-soft">
            <span className="sr-only">{t('hiit.builder.moveToSet')}</span>
            <select
              id={selectId}
              value=""
              onChange={(event) => event.target.value && onMoveToSet(event.target.value)}
              className="h-11 cursor-pointer rounded-button border-2 border-ink/20 bg-white px-2 text-2 text-ink"
            >
              <option value="">{t('hiit.builder.moveToSet')}</option>
              {otherSets.map((other) => (
                <option key={other.id} value={other.id}>
                  {other.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <IconButton label={`${t('action.remove')}: ${name}`} onClick={onRemove} tone="brand">
          <TrashIcon />
        </IconButton>
      </div>
      <div className="col-span-3 flex flex-wrap items-end gap-3 sm:col-start-3 sm:col-span-2">
        <NumberField
          id={`placed-${placed.id}-train`}
          label={t('label.train')}
          value={placed.trainSeconds}
          onChange={onTrain}
          min={5}
          max={600}
          step={5}
          unit={t('label.seconds')}
          className="w-56"
        />
        <NumberField
          id={`placed-${placed.id}-rest`}
          label={t('label.rest')}
          value={placed.restSeconds}
          onChange={onRest}
          min={0}
          max={600}
          step={5}
          unit={t('label.seconds')}
          className="w-56"
        />
      </div>
    </Reorder.Item>
  );
}
