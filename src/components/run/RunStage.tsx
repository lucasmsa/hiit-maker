import { Digits } from '@/components/ui/Digits';
import { ExerciseTile } from '@/components/ui/ExerciseTile';
import type { ExerciseVisual } from '@/lib/run-view';

interface RunStageProps {
  phaseWord: string;
  remainingClock: string;
  remainingLabel: string;
  exercise: string | undefined;
  upcoming: string | undefined;
  upcomingLabel: string;
  upcomingVisual: ExerciseVisual | undefined;
  showUpcomingTile: boolean;
  positionText: string | undefined;
}

export function RunStage({
  phaseWord,
  remainingClock,
  remainingLabel,
  exercise,
  upcoming,
  upcomingLabel,
  upcomingVisual,
  showUpcomingTile,
  positionText,
}: RunStageProps) {
  return (
    <section className="run-stage">
      <div className="run-stage-text">
        <p className="run-word">{phaseWord}</p>
        <Digits value={remainingClock} label={remainingLabel} className="run-digits" />
        {exercise ? <h1 className="run-name">{exercise}</h1> : null}
        {upcoming ? (
          <p className="run-upcoming">
            <span className="run-upcoming-label">{upcomingLabel}:</span> {upcoming}
          </p>
        ) : null}
        {positionText ? <p className="run-position">{positionText}</p> : null}
      </div>
      {showUpcomingTile && upcoming && upcomingVisual ? (
        <div className="run-next">
          <ExerciseTile
            name={upcoming}
            photo={upcomingVisual.photo}
            group={upcomingVisual.group}
            placed
            sizes="(min-width: 1024px) 260px, 44vw"
          />
        </div>
      ) : null}
    </section>
  );
}
