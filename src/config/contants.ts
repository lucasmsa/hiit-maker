export const GITHUB_LINK = 'https://github.com/lucasmsa/hiit-maker';

export const INITIAL_DEFAULT_VALUES = {
  warmupTime: 90,
  exerciseRestTime: 30,
  exerciseTrainTime: 45,
  setRestTime: 90,
  setRepetitions: 3
};

export const WORKOUT_EXECUTION_STATUS = {
  REST: 'rest',
  TRAIN: 'train',
  WARMUP: 'warmup',
  FINISH: 'finish'
} as { [key in 'REST' | 'TRAIN' | 'WARMUP' | 'FINISH']: WORKOUT_EXECUTION_STATUS_TYPES };

export const PLAY_STATE = {
  NOT_STARTED: 'not_started',
  PLAY: 'playing',
  PAUSE: 'paused'
} as { [key in 'PLAY' | 'PAUSE' | 'NOT_STARTED']: PLAY_STATE_TYPES };
