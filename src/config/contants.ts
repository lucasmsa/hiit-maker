export const GITHUB_LINK = 'https://github.com/lucasmsa/hiit-maker';

export const INITIAL_DEFAULT_VALUES = {
  warmupTime: 5,
  exerciseRestTime: 5,
  exerciseTrainTime: 10,
  setRestTime: 15,
  setRepetitions: 1
};

export const WORKOUT_EXECUTION_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  REST: 'REST',
  TRAIN: 'TRAIN',
  WARMUP: 'WARMUP',
  FINISH: 'FINISH'
} as WORKOUT_EXECUTION_STATUS_TYPES;

export const PLAY_STATE = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE'
} as PLAY_STATE_TYPES;

export const REDUX_PERSISTANCE_CONFIGURATION_KEY = 'hiit-maker';
