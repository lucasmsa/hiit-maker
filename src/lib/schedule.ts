import type { Defaults, HiitWorkout, Phase } from '@/lib/types';

export function compileHiitSchedule(workout: HiitWorkout): Phase[] {
  const phases: Phase[] = [];
  if (workout.warmupSeconds > 0) {
    phases.push({ id: 'warmup', kind: 'warmup', durationMs: seconds(workout.warmupSeconds) });
  }

  const populatedSets = workout.sets.filter((set) => set.exercises.length > 0);

  populatedSets.forEach((set, setIndex) => {
    for (let loopIndex = 0; loopIndex < set.loops; loopIndex += 1) {
      set.exercises.forEach((placed, exerciseIndex) => {
        const position = { setIndex, loopIndex, exerciseIndex, placedExerciseId: placed.id, ref: placed.ref };
        const prefix = `${set.id}:${loopIndex}:${placed.id}`;
        phases.push({ id: `${prefix}:train`, kind: 'train', durationMs: seconds(placed.trainSeconds), ...position });

        const isLastOfLoop = exerciseIndex === set.exercises.length - 1;
        const isLastLoop = loopIndex === set.loops - 1;
        const restFollows = !(isLastOfLoop && isLastLoop) && placed.restSeconds > 0;
        if (restFollows) {
          phases.push({ id: `${prefix}:rest`, kind: 'rest', durationMs: seconds(placed.restSeconds), ...position });
        }
      });
    }

    const isLastSet = setIndex === populatedSets.length - 1;
    if (!isLastSet && set.setRestSeconds > 0) {
      phases.push({ id: `${set.id}:setRest`, kind: 'setRest', durationMs: seconds(set.setRestSeconds), setIndex });
    }
  });

  return phases;
}

export function compileRestSchedule(restSeconds: number): Phase[] {
  return [{ id: 'rest', kind: 'rest', durationMs: seconds(restSeconds) }];
}

export function scheduleTotalMs(schedule: Phase[]): number {
  return schedule.reduce((total, phase) => total + phase.durationMs, 0);
}

export function workoutTotalSeconds(workout: HiitWorkout): number {
  return Math.round(scheduleTotalMs(compileHiitSchedule(workout)) / 1000);
}

export function defaultsTotalSeconds(defaults: Defaults, exerciseCount: number, setCount: number): number {
  const perLoop = exerciseCount * (defaults.trainSeconds + defaults.restSeconds);
  return defaults.warmupSeconds + setCount * (perLoop * defaults.setRepetitions + defaults.setRestSeconds);
}

function seconds(value: number): number {
  return Math.max(0, Math.round(value)) * 1000;
}
