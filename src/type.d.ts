type AfflictedAreas = 'Chest' | 'Legs' | 'Back' | 'Abdomen'

interface Exercise {
  name: string, 
  image: string,
  restTime: number, 
  trainTime: number,
  afflictedBodyParts: string
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
    exercise: IExercise;
    set: number;
  }
}

type DispatchType = (args: TrainingAction) => TrainingAction;