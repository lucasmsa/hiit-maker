type AfflictedAreas = 'Chest' | 'Legs' | 'Back' | 'Core';

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

type TrainingState = {
  currentSet: number;
  trainSetLoops: TrainSetLoop[];
  afflictedAreas: IAfflictedAreasCounter;
  totalTrainingTime: number;
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
  };
};

type DispatchType = (args: TrainingAction) => TrainingAction;
