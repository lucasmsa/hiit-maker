type AfflictedAreas = 'Chest' | 'Legs' | 'Back' | 'Core';

interface States {
  training: TrainingState;
  workoutExecution: WorkoutExecutionState;
}

type IAfflictedAreasCounter<AfflictedAreas> = {
  [Property in keyof AfflictedAreas]: number;
};

type WORKOUT_EXECUTION_STATUS = 'WARMUP' | 'TRAIN' | 'REST' | 'FINISH' | 'NOT_STARTED';

type PLAY_STATE = 'PLAY' | 'PAUSE';

type WORKOUT_EXECUTION_STATUS_TYPES = {
  [key in WORKOUT_EXECUTION_STATUS]: WORKOUT_EXECUTION_STATUS;
};

type PLAY_STATE_TYPES = {
  [key in PLAY_STATE]: PLAY_STATE;
};

interface Exercise {
  name: string;
  image: string;
  restTime: number;
  trainTime: number;
  afflictedBodyPart?: AfflictedAreas;
}

interface ExerciseVisualization
  extends Omit<Exercise, 'restTime' | 'trainTime' | 'afflictedBodyPart'> {}

interface TrainSet {
  exercises: Exercise[];
  setLoopTime: number;
}

interface TrainSetLoop {
  trainSet: TrainSet;
  loops: number;
  totalSetTime: number;
  setRestTime: number;
}

interface TrainingDefaultValues {
  warmupTime: number;
  exerciseRestTime: number;
  exerciseTrainTime: number;
  setRestTime: number;
  setRepetitions: number;
}

type TrainingState = {
  trainingDefaultValues: TrainingDefaultValues;
  currentSet: number;
  trainSetLoops: TrainSetLoop[];
  afflictedAreas: IAfflictedAreasCounter;
  totalTrainingTime: number;
};

type WorkoutExecutionState = {
  currentSetIndex: number;
  currentSetLoopIndex: number;
  currentSetExerciseIndex: number;
  currentActionRemainingTime: number;
  status: WORKOUT_EXECUTION_STATUS;
  playState: PLAY_STATE;
};

type TrainingAction = {
  type: string;
  payload: {
    index?: number;
    exercise?: Exercise;
    loops?: number;
    set: number;
    restTime?: number;
    trainTime?: number;
    setRestTime?: number;
    defaultTrainingValues?: TrainingDefaultValues;
  };
};

type WorkoutExecutionAction = {
  type: string;
  payload: {
    warmupTime?: number;
    remainingTime?: number;
    status?: WORKOUT_EXECUTION_STATUS;
  };
};

type Pair<T, K> = [T, K];
type Pairs<T, K> = Pair<T, K>[];

type DispatchType = (args: TrainingAction) => TrainingAction;
