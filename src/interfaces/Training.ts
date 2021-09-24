import { AfflictedAreas } from "./AfflictedAreas";
import TrainSetLoop from "./TrainSetLoop";

export default interface Training {
  currentSet: number;
  trainSetLoops: TrainSetLoop[],
  afflictedAreas: AfflictedAreas[],
  totalTrainingTime: number
}