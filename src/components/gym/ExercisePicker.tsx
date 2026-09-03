import { Field, TextInput } from '@/components/ui/Field';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import type { GymSearchGroup } from '@/lib/gym-search';
import { muscleIconFor } from '@/lib/muscle-icon';
import type { ExerciseRef } from '@/lib/types';
import { cx } from '@/lib/cx';
import type { Translate } from '@/lib/i18n';

interface ExercisePickerProps {
  id: string;
  query: string;
  results: GymSearchGroup[];
  selected: ExerciseRef | null;
  t: Translate;
  exerciseName: (ref: ExerciseRef) => string;
  onQueryChange: (value: string) => void;
  onPick: (ref: ExerciseRef) => void;
}

export function ExercisePicker({
  id,
  query,
  results,
  selected,
  t,
  exerciseName,
  onQueryChange,
  onPick,
}: ExercisePickerProps) {
  const trimmed = query.trim();
  const customRef: ExerciseRef | null = trimmed === '' ? null : { kind: 'custom', name: trimmed };
  const isSelected = (ref: ExerciseRef) =>
    selected !== null && exerciseName(selected) === exerciseName(ref) && selected.kind === ref.kind;

  return (
    <div className="flex flex-col gap-3">
      <Field id={`${id}-search`} label={t('gym.entry.search')}>
        <TextInput
          id={`${id}-search`}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
        />
      </Field>
      {selected ? (
        <p className="text-2">
          <span className="text-ink-soft">{t('gym.entry.exercise')}: </span>
          <span className="font-bold">{exerciseName(selected)}</span>
        </p>
      ) : null}
      <div className="max-h-64 overflow-y-auto rounded-button border-2 border-ink/10">
        {customRef ? (
          <button
            type="button"
            onClick={() => onPick(customRef)}
            aria-pressed={isSelected(customRef)}
            className={cx(
              'flex w-full items-center gap-3 border-b border-ink/10 px-3 py-2.5 text-left font-bold hover:bg-brand-soft',
              isSelected(customRef) && 'bg-brand-soft text-brand-deep',
            )}
          >
            {t('gym.entry.useCustom', { name: trimmed })}
          </button>
        ) : null}
        {results.length === 0 ? (
          <p className="px-3 py-3 text-2 text-ink-soft">{t('gym.entry.noResults')}</p>
        ) : null}
        {results.map((group) => (
          <div key={group.group}>
            <p className="bg-chalk px-3 py-1.5 text-1 font-bold text-ink-soft">
              {t(`group.${group.group}`)}
            </p>
            <ul>
              {group.exercises.map((exercise) => {
                const ref: ExerciseRef = { kind: 'catalog', exerciseId: exercise.id };
                const pressed = isSelected(ref);
                return (
                  <li key={exercise.id}>
                    <button
                      type="button"
                      onClick={() => onPick(ref)}
                      aria-pressed={pressed}
                      className={cx(
                        'flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-brand-soft',
                        pressed && 'bg-brand-soft font-bold text-brand-deep',
                      )}
                    >
                      <MuscleIcon name={muscleIconFor(exercise.muscleGroup)} className="shrink-0" />
                      <span>{exerciseName(ref)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
