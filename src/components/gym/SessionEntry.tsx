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
    <section aria-labelledby={`${id}-name`} className="card flex flex-col gap-4 px-5 py-5 sm:px-6">
      <header className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper-dim text-brand">
          <MuscleIcon name={icon} />
        </span>
        <div className="min-w-0 flex-1">
          <h2
            id={`${id}-name`}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-4 font-semibold leading-tight"
          >
            {name}
            {optionalLabel ? <span className="pill h-6 text-1">{optionalLabel}</span> : null}
          </h2>
          <p className="text-2 font-bold">{details.join(', ')}</p>
          {notes ? <p className="text-1 text-ink-soft">{notes}</p> : null}
        </div>
      </header>
      <table className="w-full border-separate border-spacing-y-1.5">
        <thead>
          <tr className="settings-row-label text-left text-ink-soft">
            <th scope="col" className="w-20 pl-2 font-semibold">
              {t('gym.run.set')}
            </th>
            <th scope="col" className="font-semibold">
              {t('unit.kg')}
            </th>
            <th scope="col" className="font-semibold">
              {measureHeading}
            </th>
            <th scope="col" className="w-14 text-center font-semibold">
              {t('gym.run.done')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const number = row.index + 1;
            const previous = previousLabel(row);
            return (
              <tr key={row.index} className={cx(row.done && '[&>*]:bg-go/10')}>
                <th scope="row" className="rounded-l-full pl-3 text-left align-middle">
                  <span className="font-display text-3 font-semibold">{number}</span>
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
                    className="cell-pill"
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
                    className="cell-pill"
                  />
                </td>
                <td className="rounded-r-full pr-1 text-center align-middle">
                  {row.done ? (
                    <button
                      type="button"
                      aria-label={t('gym.run.markUndone', { index: number })}
                      onClick={() => onUndo(row)}
                      className="grid size-10 place-items-center rounded-full bg-go text-white hover:bg-go-deep"
                    >
                      <UndoIcon size={20} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      aria-label={t('gym.run.markDone', { index: number })}
                      onClick={() => onDone(row)}
                      className="grid size-10 place-items-center rounded-full border-2 border-brand text-brand hover:bg-brand hover:text-white"
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
      <button type="button" onClick={onAddSet} className="text-link-red self-start">
        {t('gym.run.addSet')}
      </button>
    </section>
  );
}
