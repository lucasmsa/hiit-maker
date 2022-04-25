export const workoutExecutionInitialState = {
  currentSet: 0,
  currentSetLoop: 0,
  currentSetExercise: 0,
  currentActionRemainingTime: 0
} as WorkoutExecutionState;

interface IReducer {
  state: WorkoutExecutionState;
  action: WorkoutExecutionAction;
}

interface IReducerFunctions {
  [key: string]: ({ state, action }: IReducer) => WorkoutExecutionState;
}

const reducerFunctions = {} as IReducerFunctions;

const reducer = (
  state: WorkoutExecutionState = workoutExecutionInitialState,
  action: TrainingAction
): WorkoutExecutionState => {
  return action.type in reducerFunctions ? reducerFunctions[action.type]({ state, action }) : state;
};

export default reducer;
