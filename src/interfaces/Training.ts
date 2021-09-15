import { AfflictedAreas } from "./AfflictedAreas";
import TrainSetLoop from "./TrainSetLoop";

export default interface Training {
  trainSetLoops: TrainSetLoop[],
  afflictedAreas: AfflictedAreas[],
  totalTrainingTime: number
}