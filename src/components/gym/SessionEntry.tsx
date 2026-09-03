import { Button } from '@/components/ui/Button';
import { LaneChip } from '@/components/ui/LaneChip';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { CheckIcon, UndoIcon } from '@/components/gym/gym-icons';
import type { SetRow } from '@/hooks/useGymSession';
import type { Translate } from '@/lib/i18n';
import type { MuscleIconName } from '@/lib/muscle-icon';
import { cx } from '@/lib/cx';

interface SessionEntryProps {
  id: string;
  name: string;
  prescription: string;
  tempo?: string | undefined;
  notes?: string | undefined;
  optionalLabel: string | null;
  icon: MuscleIconName;
  timeBased: boolean;
  rows: SetRow[];
  previousLabel: (row: SetRow) => string | null;
  t: Translate;
  onInput: (row: SetRow, field: 'weight' | 'reps', value: string) => void;
  onDone: (row: SetRow) => void;
  onUndo: (row: SetRow) => void;
  onAddSet: () => void;
}

const cellInput =
  'h-11 w-full rounded-button border-2 border-ink/20 bg-white px-2 text-center font-body text-2 font-bold text-ink tabular-nums focus:border-ink disabled:bg-chalk disabled:text-ink-soft';

export function SessionEntry({
  id,
  name,
  prescription,
  tempo,
  notes,
  optionalLabel,
  icon,
  timeBased,
  rows,
  previousLabel,
  t,
  onInput,
  onDone,
  onUndo,
  onAddSet,
}: SessionEntryProps) {
  const measureHeading = timeBased ? t('label.seconds') : t('label.reps');
  const details = [prescription, tempo].filter((part): part is string => Boolean(part));
  return (
    <section
      aria-labelledby={`${id}-name`}
      className="flex flex-col gap-3 border-b border-ink/10 py-6"
    >
      <header className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-deep">
          <MuscleIcon name={icon} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`${id}-name`} className="flex flex-wrap items-baseline gap-x-2 text-5">
            {name}
            {optionalLabel ? (
              <LaneChip size="sm" tone="soft">
                {optionalLabel}
              </LaneChip>
            ) : null}
          </h2>
          <p className="text-2 font-bold">{details.join(', ')}</p>
          {notes ? <p className="text-1 text-ink-soft">{notes}</p> : null}
        </div>
      </header>
      <table className="w-full border-separate border-spacing-y-1.5">
        <thead>
          <tr className="text-left text-1 font-bold text-ink-soft">
            <th scope="col" className="w-20 pl-2 font-bold">
              {t('gym.run.set')}
            </th>
            <th scope="col" className="font-bold">
              {t('unit.kg')}
            </th>
            <th scope="col" className="font-bold">
              {measureHeading}
            </th>
            <th scope="col" className="w-14 text-center font-bold">
              {t('gym.run.done')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const number = row.index + 1;
            const previous = previousLabel(row);
            return (
              <tr key={row.index} className={cx(row.done && '[&>*]:bg-recover/10')}>
                <th scope="row" className="rounded-l-button pl-2 text-left align-middle">
                  <span className="font-display text-4 font-extrabold">{number}</span>
                  {previous ? (
                    <span className="block text-1 font-normal text-ink-soft">{previous}</span>
                  ) : null}
                </th>
                <td className="px-1 align-middle">
                  <input
                    type="number"
                    inputMode="decimal"
                    step={2.5}
                    min={0}
                    aria-label={t('gym.run.weightFor', { index: number })}
                    value={row.input.weight}
                    disabled={row.done}
                    onChange={(event) => onInput(row, 'weight', event.target.value)}
                    className={cellInput}
                  />
                </td>
                <td className="px-1 align-middle">
                  <input
                    type="number"
                    inputMode="numeric"
                    step={1}
                    min={0}
                    aria-label={t(timeBased ? 'gym.run.secondsFor' : 'gym.run.repsFor', {
                      index: number,
                    })}
                    value={row.input.reps}
                    disabled={row.done}
                    onChange={(event) => onInput(row, 'reps', event.target.value)}
                    className={cellInput}
                  />
                </td>
                <td className="rounded-r-button pr-1 text-center align-middle">
                  {row.done ? (
                    <button
                      type="button"
                      aria-label={t('gym.run.markUndone', { index: number })}
                      onClick={() => onUndo(row)}
                      className="grid size-11 place-items-center rounded-button bg-recover text-white hover:bg-[#177f55]"
                    >
                      <UndoIcon size={20} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      aria-label={t('gym.run.markDone', { index: number })}
                      onClick={() => onDone(row)}
                      className="grid size-11 place-items-center rounded-button border-2 border-ink text-ink hover:bg-ink hover:text-white"
                    >
                      <CheckIcon size={20} />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button variant="ghost" onClick={onAddSet} className="self-start">
        {t('gym.run.addSet')}
      </Button>
    </section>
  );
}
