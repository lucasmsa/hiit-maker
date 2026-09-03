import { ProgressCard } from '@/components/run/ProgressCard';
import { ExitIcon } from '@/components/run/run-icons';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { Toggle } from '@/components/ui/Toggle';
import type { ExerciseVisual, ProgressRow } from '@/lib/run-view';

export interface UpcomingItem {
  key: string;
  name: string;
  visual: ExerciseVisual | undefined;
}

interface RunSideBarProps {
  title: string;
  upcoming: UpcomingItem[];
  emptyText: string;
  progressTitle: string;
  rows: ProgressRow[];
  footer: string;
  soundLabel: string;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
  exitLabel: string;
  onExit: () => void;
}

export function RunSideBar({
  title,
  upcoming,
  emptyText,
  progressTitle,
  rows,
  footer,
  soundLabel,
  muted,
  onMutedChange,
  exitLabel,
  onExit,
}: RunSideBarProps) {
  return (
    <aside className="run-side">
      <h2 className="run-side-title">{title}</h2>
      {upcoming.length > 0 ? (
        <ul className="run-upcoming">
          {upcoming.map((item) => (
            <li key={item.key}>
              {item.visual ? (
                <img
                  src={`/exercises/${item.visual.photo}-480.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="run-upcoming-photo"
                />
              ) : (
                <span className="run-upcoming-fallback">
                  <MuscleIcon name="cardio" size={24} />
                </span>
              )}
              <span className="run-upcoming-name">{item.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="run-upcoming-empty">{emptyText}</p>
      )}
      <ProgressCard title={progressTitle} rows={rows} footer={footer} />
      <div className="run-side-footer">
        <Toggle
          id="run-sound"
          label={soundLabel}
          checked={!muted}
          onChange={(on) => onMutedChange(!on)}
          className="run-sound"
        />
        <button type="button" className="run-text run-text-inverse" onClick={onExit}>
          <ExitIcon size={18} />
          {exitLabel}
        </button>
      </div>
    </aside>
  );
}
