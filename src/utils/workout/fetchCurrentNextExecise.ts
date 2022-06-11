import { filterExerciseImageAndName } from './filterExerciseNameAndImage';

export interface IUpdatedValues {
  setExerciseIndex: number;
  trainSetExercises: Exercise[];
  setLoopIndex: number;
  setIndex: number;
  nextExercises: ExerciseVisualization[];
}

export const fetchCurrentNextExercise = (
  updatedValues: IUpdatedValues,
  training: TrainSetLoop[]
): 'NEXT' | 'TRAINING_FINISHED' => {
  if (updatedValues['setExerciseIndex'] + 1 < updatedValues['trainSetExercises'].length) {
    updatedValues['setExerciseIndex'] += 1;
    updatedValues['nextExercises'].push(
      filterExerciseImageAndName(
        updatedValues['trainSetExercises'],
        updatedValues['setExerciseIndex']
      )
    );
  } else {
    if (updatedValues['setLoopIndex'] + 1 < training[updatedValues['setIndex']].loops) {
      updatedValues['setLoopIndex'] += 1;
      updatedValues['setExerciseIndex'] = 0;
      updatedValues['nextExercises'].push(
        filterExerciseImageAndName(
          updatedValues['trainSetExercises'],
          updatedValues['setExerciseIndex']
        )
      );
    } else {
      if (updatedValues['setIndex'] + 1 < training.length) {
        updatedValues['setLoopIndex'] = 0;
        updatedValues['setExerciseIndex'] = 0;
        updatedValues['setIndex'] += 1;
        updatedValues['trainSetExercises'] = training[updatedValues['setIndex']].trainSet.exercises;
        updatedValues['nextExercises'].push(
          filterExerciseImageAndName(
            updatedValues['trainSetExercises'],
            updatedValues['setExerciseIndex']
          )
        );
      } else {
        return 'TRAINING_FINISHED';
      }
    }
  }

  return 'NEXT';
};
