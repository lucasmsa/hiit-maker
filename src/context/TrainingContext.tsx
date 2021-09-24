import React, { createContext, useCallback, useState } from 'react'
import Exercise from '../interfaces/Exercise';
import Training from '../interfaces/Training';

interface TrainingContextState {
  training: Training;
}

interface TrainingContextData {
  training: Training;
  addExerciseToCurrentSetLoop(exercise: Exercise): void;
}

const TrainingContext = createContext<TrainingContextData>({} as TrainingContextData);

const TrainingProvider: React.FC = ({ children }) => {

  // const [trainingData, setTrainingData] = useState<TrainingContextState>({} as TrainingContextState);
  const [trainingData, setTrainingData] = useState<TrainingContextState>({
    training: {
      currentSet: 0,
      afflictedAreas: [],
      totalTrainingTime: 0,
      trainSetLoops: [],
    }
  } as TrainingContextState)
 
  const addExerciseToCurrentSetLoop = useCallback((exercise: Exercise) => {
    const setNumber = trainingData.training.currentSet;
    const currentSetLoop = trainingData.training.trainSetLoops[setNumber];
    const updatedCurrentSet = currentSetLoop.trainSets.exercises.push(exercise);

    setTrainingData({
      ...trainingData,
      training: {
        ...trainingData.training,
        trainSetLoops: [...trainingData.training.trainSetLoops]
      }
    })

    console.log(trainingData);
  }, [trainingData])

  return (  
    <TrainingContext.Provider value={{ training: trainingData.training, addExerciseToCurrentSetLoop }}>
      { children } 
    </TrainingContext.Provider>
  );
}

export default TrainingContext