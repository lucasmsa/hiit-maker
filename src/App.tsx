import React, { useCallback } from 'react';
import Routes from './routes'
import { Dispatch } from 'redux'
import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { addExercise } from './store/actionCreators';
import { Toaster } from 'react-hot-toast';

function App() {
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
