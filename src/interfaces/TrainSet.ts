import { Exercise } from "../components/AvailableExercises";

export default interface TrainSet {
  exercises: Exercise[],
  setLoopTime: number
}