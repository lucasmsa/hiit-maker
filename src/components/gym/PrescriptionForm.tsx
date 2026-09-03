import { Field, NumberField, TextInput } from '@/components/ui/Field';
import { Toggle } from '@/components/ui/Toggle';
import type { EntryDraft, MeasureKind } from '@/lib/gym-draft';
import type { Translate } from '@/lib/i18n';
import { cx } from '@/lib/cx';

interface PrescriptionFormProps {
  id: string;
  draft: EntryDraft;
  t: Translate;
  onChange: (patch: Partial<EntryDraft>) => void;
}

const measures: MeasureKind[] = ['reps', 'time', 'unspecified'];

export function PrescriptionForm({ id, draft, t, onChange }: PrescriptionFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField
          id={`${id}-sets-min`}
          label={t('gym.entry.sets')}
          value={draft.setsMin}
          min={1}
          max={20}
          onChange={(setsMin) => onChange({ setsMin, setsMax: Math.max(setsMin, draft.setsMax) })}
        />
        <NumberField
          id={`${id}-sets-max`}
          label={t('gym.entry.upTo')}
          value={draft.setsMax}
          min={draft.setsMin}
          max={20}
          onChange={(setsMax) => onChange({ setsMax })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span id={`${id}-measure-label`} className="text-1 font-bold text-ink-soft">
          {t('gym.entry.measure')}
        </span>
        <div
          role="radiogroup"
          aria-labelledby={`${id}-measure-label`}
          className="flex gap-1 rounded-button bg-ink/10 p-1"
        >
          {measures.map((measure) => {
            const checked = draft.measure === measure;
            return (
              <button
                key={measure}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => onChange({ measure })}
                className={cx(
                  'h-10 flex-1 rounded-[6px] font-bold transition-colors duration-150',
                  checked ? 'bg-white text-ink shadow-sm' : 'text-ink-soft hover:text-ink',
                )}
              >
                {t(`gym.entry.measure.${measure}`)}
              </button>
            );
          })}
        </div>
      </div>

      {draft.measure === 'reps' ? (
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            id={`${id}-reps-min`}
            label={t('gym.entry.reps')}
            value={draft.repsMin}
            min={1}
            max={100}
            onChange={(repsMin) => onChange({ repsMin, repsMax: Math.max(repsMin, draft.repsMax) })}
          />
          <NumberField
            id={`${id}-reps-max`}
            label={t('gym.entry.upTo')}
            value={draft.repsMax}
            min={draft.repsMin}
            max={100}
            onChange={(repsMax) => onChange({ repsMax })}
          />
        </div>
      ) : null}

      {draft.measure === 'time' ? (
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            id={`${id}-seconds-min`}
            label={t('gym.entry.seconds')}
            value={draft.secondsMin}
            min={5}
            max={600}
            step={5}
            unit={t('label.seconds')}
            onChange={(secondsMin) =>
              onChange({ secondsMin, secondsMax: Math.max(secondsMin, draft.secondsMax) })
            }
          />
          <NumberField
            id={`${id}-seconds-max`}
            label={t('gym.entry.upTo')}
            value={draft.secondsMax}
            min={draft.secondsMin}
            max={600}
            step={5}
            unit={t('label.seconds')}
            onChange={(secondsMax) => onChange({ secondsMax })}
          />
        </div>
      ) : null}

      <Field id={`${id}-tempo`} label={t('gym.entry.tempo')} hint={t('gym.entry.tempoHint')}>
        <TextInput
          id={`${id}-tempo`}
          value={draft.tempo}
          onChange={(event) => onChange({ tempo: event.target.value })}
          aria-describedby={`${id}-tempo-hint`}
        />
      </Field>

      <Toggle
        id={`${id}-per-side`}
        label={t('gym.entry.perSide')}
        checked={draft.perSide}
        onChange={(perSide) => onChange({ perSide })}
      />
      <Toggle
        id={`${id}-optional`}
        label={t('gym.entry.optional')}
        checked={draft.optional}
        onChange={(optional) => onChange({ optional })}
      />

      <Field id={`${id}-notes`} label={t('gym.entry.notes')}>
        <textarea
          id={`${id}-notes`}
          value={draft.notes}
          onChange={(event) => onChange({ notes: event.target.value })}
          rows={2}
          className="w-full rounded-button border-2 border-ink/20 bg-white px-3 py-2 font-body text-2 text-ink focus:border-ink"
        />
      </Field>

      <Toggle
        id={`${id}-custom-rest`}
        label={t('gym.entry.customRest')}
        checked={draft.customRest}
        onChange={(customRest) => onChange({ customRest })}
      />
      {draft.customRest ? (
        <NumberField
          id={`${id}-rest`}
          label={t('gym.entry.rest')}
          value={draft.restSeconds}
          min={0}
          max={600}
          step={5}
          unit={t('label.seconds')}
          onChange={(restSeconds) => onChange({ restSeconds })}
        />
      ) : null}
    </div>
  );
}
