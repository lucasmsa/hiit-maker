import type { Translate } from '@/lib/i18n';
import type { GymDay } from '@/lib/types';

interface DayPickerProps {
  days: GymDay[];
  t: Translate;
  onPick: (dayId: string) => void;
}

export function DayPicker({ days, t, onPick }: DayPickerProps) {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="card-title justify-start">{t('gym.run.pickDay')}</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {days.map((day) => (
          <li key={day.id}>
            <button
              type="button"
              onClick={() => onPick(day.id)}
              className="card flex w-full flex-col items-start gap-2 px-6 py-5 text-left transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="font-display text-4 font-semibold leading-tight">{day.name}</span>
              <span className="pill">{t('gym.run.entries', { count: day.entries.length })}</span>
              {day.notes ? <span className="text-1 text-ink-soft">{day.notes}</span> : null}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
