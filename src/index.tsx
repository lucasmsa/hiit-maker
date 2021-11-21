import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './store/reducer';
import { composeWithDevTools } from "redux-devtools-extension";

const store: Store<TrainingState, TrainingAction>
  & {
    dispatch: DispatchType
} = createStore(
      reducer,
      composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);