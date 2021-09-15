import { createContext } from 'react'
import Training from '../interfaces/Training';

interface TrainingContextState {
  training: Training;
}

const TrainingContext = createContext<TrainingContextState>({} as TrainingContextState);

export default TrainingContext