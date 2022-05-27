type AfflictedAreas = 'Chest' | 'Legs' | 'Back' | 'Core';

interface States {
  training: TrainingState;
  workoutExecution: WorkoutExecutionState;
}

type IAfflictedAreasCounter<AfflictedAreas> = {
  [Property in keyof AfflictedAreas]: number;
};

interface Exercise {
  name: string;
  image: string;
  restTime: number;
  trainTime: number;
  afflictedBodyPart?: AfflictedAreas;
}

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
  currentSet: number;
  currentSetLoop: number;
  currentSetExercise: number;
  currentActionRemainingTime: number;
  status: WORKOUT_EXECUTION_STATUS_TYPES;
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
    set?: number;
    exercise?: Exercise;
    time?: number;
    loop?: number;
  };
};

type Pair<T, K> = [T, K];
type Pairs<T, K> = Pair<T, K>[];

type DispatchType = (args: TrainingAction) => TrainingAction;
