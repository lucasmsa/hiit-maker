import Exercise from "../interfaces/Exercise";

export default interface TrainSet {
  exercises: Exercise[],
  setLoopTime: number
}