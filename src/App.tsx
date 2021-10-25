import React, { useCallback } from 'react';
import Routes from './routes'
import { Dispatch } from 'redux'
import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { addExercise } from './store/actionCreators';
import { Toaster } from 'react-hot-toast';

function App() {
  const trainSetLoops: readonly TrainSetLoop[] = useSelector(
    (state: TrainingState) => state.trainSetLoops,
    shallowEqual
  )

  const dispatch: Dispatch<any> = useDispatch();

  const addNewExerciseToTraining = useCallback(
    (exercise: Exercise, set: number) => {
      dispatch(addExercise(exercise, set))
    },
    [dispatch],
  )

  return (
    <>
      <div><Toaster/></div>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
