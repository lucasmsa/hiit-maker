export const filterExerciseImageAndName = (
  updatedTrainSetExercises: Exercise[],
  updatedSetExerciseIndex: number
) => {
  return {
    name: updatedTrainSetExercises[updatedSetExerciseIndex].name,
    image: updatedTrainSetExercises[updatedSetExerciseIndex].image
  };
};
