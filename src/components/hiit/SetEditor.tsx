import { Reorder } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { NumberField } from '@/components/ui/Field';
import { LaneChip } from '@/components/ui/LaneChip';
import { PlacedExerciseRow } from '@/components/hiit/PlacedExerciseRow';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';
import type { HiitSet } from '@/lib/types';

interface SetEditorProps {
  set: HiitSet;
  index: number;
  allSets: HiitSet[];
  isCurrent: boolean;
  flashId: string | null;
  onSelect: () => void;
  onLoops: (loops: number) => void;
  onSetRest: (seconds: number) => void;
  onRemoveSet: () => void;
  onAddExercise: () => void;
  onTrain: (placedId: string, seconds: number) => void;
  onRest: (placedId: string, seconds: number) => void;
  onRemoveExercise: (placedId: string) => void;
  onReorder: (orderedIds: string[]) => void;
  onMoveBy: (placedId: string, delta: -1 | 1) => void;
  onMoveToSet: (placedId: string, setId: string) => void;
}

export function SetEditor({
  set,
  index,
  allSets,
  isCurrent,
  flashId,
  onSelect,
  onLoops,
  onSetRest,
  onRemoveSet,
  onAddExercise,
  onTrain,
  onRest,
  onRemoveExercise,
  onReorder,
  onMoveBy,
  onMoveToSet,
}: SetEditorProps) {
  const t = useT();
  const title = t('hiit.builder.setTitle', { n: index + 1 });
  const otherSets = allSets
    .map((candidate, candidateIndex) => ({ id: candidate.id, label: t('hiit.builder.setTitle', { n: candidateIndex + 1 }) }))
    .filter((candidate) => candidate.id !== set.id);

  return (
    <section
      aria-label={title}
      aria-current={isCurrent ? 'true' : undefined}
      onFocusCapture={onSelect}
      className={cx(
        'flex flex-col gap-4 rounded-button border-2 p-4 transition-colors duration-200 sm:p-5',
        isCurrent ? 'border-brand bg-brand-soft/40' : 'border-transparent bg-white/60',
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <LaneChip tone={isCurrent ? 'brand' : 'ink'}>{title}</LaneChip>
          {isCurrent ? <span className="text-1 font-bold text-brand-deep">{t('hiit.builder.currentSet')}</span> : null}
        </div>
        <NumberField
          id={`set-${set.id}-loops`}
          label={t('label.loops')}
          value={set.loops}
          onChange={onLoops}
          min={1}
          max={20}
          unit="x"
          className="w-56"
        />
      </div>

      {set.exercises.length === 0 ? (
        <p className="text-ink-soft">{t('hiit.builder.emptySet')}</p>
      ) : (
        <Reorder.Group
          as="ul"
          axis="y"
          values={set.exercises}
          onReorder={(items) => onReorder(items.map((item) => item.id))}
          className="flex flex-col gap-2"
        >
          {set.exercises.map((placed, placedIndex) => (
            <PlacedExerciseRow
              key={placed.id}
              placed={placed}
              set={set}
              index={placedIndex}
              otherSets={otherSets}
              flashing={flashId === placed.id}
              onTrain={(seconds) => onTrain(placed.id, seconds)}
              onRest={(seconds) => onRest(placed.id, seconds)}
              onRemove={() => onRemoveExercise(placed.id)}
              onMoveUp={() => onMoveBy(placed.id, -1)}
              onMoveDown={() => onMoveBy(placed.id, 1)}
              onMoveToSet={(setId) => onMoveToSet(placed.id, setId)}
            />
          ))}
        </Reorder.Group>
      )}

      <div className="flex flex-wrap items-end justify-between gap-3">
        <Button variant="secondary" onClick={onAddExercise} className="lg:hidden">
          {t('hiit.builder.addExercise')}
        </Button>
        <NumberField
          id={`set-${set.id}-rest`}
          label={t('label.setRest')}
          value={set.setRestSeconds}
          onChange={onSetRest}
          min={0}
          max={600}
          step={5}
          unit={t('label.seconds')}
          className="w-56"
        />
        <Button variant="ghost" onClick={onRemoveSet} disabled={allSets.length <= 1} className="text-brand-deep">
          {t('hiit.builder.removeSet')}
        </Button>
      </div>
    </section>
  );
}
