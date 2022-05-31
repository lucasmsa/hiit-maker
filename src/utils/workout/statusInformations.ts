export const statusInformations = {
  WARMUP: { icon: 'WarmupIcon', bottomText: 'WARMUP TIME' },
  REST: { icon: 'fa6-solid:clock', bottomText: 'REST TIME' },
  PAUSE: { icon: 'fa6-solid:circle-pause', bottomText: 'SET PAUSED' },
  TRAIN: { icon: 'EXERCISE_IMAGE', bottomText: 'TRAIN TIME' },
  FINISH: { icon: 'bi:check-circle-fill', bottomText: 'TRAINING IS OVER!!!' },
  NOT_STARTED: { icon: 'bi:check-circle-fill', bottomText: 'YOU DID NOT START THE WORKOUT YET' }
} as {
  [key in WORKOUT_EXECUTION_STATUS]: { icon: string; bottomText: string };
};
