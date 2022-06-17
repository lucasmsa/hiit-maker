import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import training from './training/trainingReducer';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { REDUX_PERSISTANCE_CONFIGURATION_KEY } from '../config/contants';
import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import workoutExecution from './workoutExecution/workoutExecutionReducer';

const reducers = combineReducers({
  training,
  workoutExecution
});

const persistConfig = {
  key: REDUX_PERSISTANCE_CONFIGURATION_KEY,
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store: Store<any, any> & {
  dispatch: DispatchType;
} = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);
