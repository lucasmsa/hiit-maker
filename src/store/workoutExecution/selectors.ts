export const getWorkoutExecutionState = (state: States) => state.workoutExecution;
export const getWorkoutExecutionStatus = (state: States) => state.workoutExecution.status;
export const getCurrentActionRemainingTime = (state: States) =>
  state.workoutExecution.currentActionRemainingTime;
