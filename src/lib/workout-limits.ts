export const MAX_EXERCISES_PER_SET = 5;
export const MAX_SETS = 8;

export function setIsFull(exerciseCount: number): boolean {
  return exerciseCount >= MAX_EXERCISES_PER_SET;
}

export function workoutIsFull(setCount: number): boolean {
  return setCount >= MAX_SETS;
}
