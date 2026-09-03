import type { Translate } from '@/lib/i18n';
import type { GymDay } from '@/lib/types';

interface DayPickerProps {
  days: GymDay[];
  t: Translate;
  onPick: (dayId: string) => void;
}

export function DayPicker({ days, t, onPick }: DayPickerProps) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-7">{t('gym.run.pickDay')}</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {days.map((day) => (
          <li key={day.id}>
            <button
              type="button"
              onClick={() => onPick(day.id)}
              className="flex w-full flex-col items-start gap-1 rounded-button border-2 border-ink bg-white px-5 py-4 text-left transition-colors duration-150 hover:bg-ink hover:text-white"
            >
              <span className="font-display text-6 font-extrabold leading-none">{day.name}</span>
              <span className="text-2 font-bold opacity-80">
                {t('gym.run.entries', { count: day.entries.length })}
              </span>
              {day.notes ? <span className="text-1 opacity-80">{day.notes}</span> : null}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
