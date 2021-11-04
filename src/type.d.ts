type AfflictedAreas = 'Chest' | 'Legs' | 'Back' | 'Core'

interface Exercise {
  name: string, 
  image: string,
  restTime: number, 
  trainTime: number,
  afflictedBodyPart: string
}

interface TrainSet {
  exercises: Exercise[],
  setLoopTime: number
}

interface TrainSetLoop {
  trainSet: TrainSet,
  loops: number,
  totalSetTime: number
}

type TrainingState = {
  currentSet: number;
  trainSetLoops: TrainSetLoop[],
  afflictedAreas: AfflictedAreas[],
  totalTrainingTime: number
}

type TrainingAction = {
  type: string;
  payload: {
    index?: number;
    exercise?: IExercise;
    loops?: number;
    set: number;
    restTime?: number;
    trainTime?: number;
  }
}

type DispatchType = (args: TrainingAction) => TrainingAction;