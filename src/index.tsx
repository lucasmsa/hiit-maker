import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import trainingReducer from './store/trainingReducer';
import workoutExecutionReducer from './store/workoutExecutionReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
  training: trainingReducer,
  workoutExecution: workoutExecutionReducer
});

const store: Store<any, any> & {
  dispatch: DispatchType;
} = createStore(trainingReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
