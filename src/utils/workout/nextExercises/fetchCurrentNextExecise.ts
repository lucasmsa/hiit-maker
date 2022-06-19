import { WORKOUT_EXECUTION_STATUS } from '../../../config/contants';
import { filterExerciseImageAndName } from './filterExerciseNameAndImage';

export interface IUpdatedValues {
  setIndex: number;
  setLoopIndex: number;
  setExerciseIndex: number;
  trainSetExercises: Exercise[];
  actionRemainingTime?: number;
  status?: WORKOUT_EXECUTION_STATUS;
  nextExercises?: ExerciseVisualization[];
}

export const fetchCurrentNextExercise = (
  updatedValues: IUpdatedValues,
  training: TrainSetLoop[],
  actionUpdate?: boolean
): 'NEXT' | 'TRAINING_FINISHED' => {
  if (updatedValues['setExerciseIndex'] + 1 < updatedValues['trainSetExercises'].length) {
    updatedValues['setExerciseIndex'] += 1;
    actionUpdate
      ? updateActionTransitionStatusAndRemainingTime(updatedValues)
      : pushFilteredExercise(updatedValues);
  } else {
    if (updatedValues['setLoopIndex'] + 1 < training[updatedValues['setIndex']].loops) {
      updatedValues['setLoopIndex'] += 1;
      updatedValues['setExerciseIndex'] = 0;
      actionUpdate
        ? updateActionTransitionStatusAndRemainingTime(updatedValues)
        : pushFilteredExercise(updatedValues);
    } else {
      if (updatedValues['setIndex'] + 1 < training.length) {
        updatedValues['setIndex'] += 1;
        updatedValues['setLoopIndex'] = 0;
        updatedValues['setExerciseIndex'] = 0;
        updatedValues['trainSetExercises'] = training[updatedValues['setIndex']].trainSet.exercises;
        actionUpdate
          ? updateActionTransitionStatusAndRemainingTime(updatedValues)
          : pushFilteredExercise(updatedValues);
      } else {
        return 'TRAINING_FINISHED';
      }
    }
  }

  return 'NEXT';
};

const pushFilteredExercise = (updatedValues: IUpdatedValues) => {
  updatedValues['nextExercises']!.push(
    filterExerciseImageAndName(
      updatedValues['trainSetExercises'],
      updatedValues['setExerciseIndex']
    )
  );
};

const updateActionTransitionStatusAndRemainingTime = (updatedValues: IUpdatedValues) => {
  updatedValues['status'] = WORKOUT_EXECUTION_STATUS.TRAIN;
  updatedValues['actionRemainingTime'] =
    updatedValues['trainSetExercises'][updatedValues['setExerciseIndex']].trainTime;
  updatedValues['status'] = WORKOUT_EXECUTION_STATUS.TRAIN;
};
