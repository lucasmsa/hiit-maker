import { AnyAction, Store } from 'redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExercise, addSet } from '../training/actionCreators';
import { ADD_SET } from '../training/actionTypes';
import { trainingInitialState } from '../training/trainingReducer';

const mockStore = configureMockStore([thunk]);

describe('Training actions creators', () => {
  let store: MockStoreEnhanced<{ training: TrainingState }, {}>;

  beforeEach(() => {
    store = mockStore({
      training: trainingInitialState
    }) as MockStoreEnhanced<{ training: TrainingState }, {}>;
  });

  describe('Add set', () => {
    describe('Action', () => {
      it('should call add set add set action type', () => {
        store.dispatch(addSet());
        const actions = store.getActions();

        expect(actions[0].type).toEqual(ADD_SET);
      });
    });
  });
});
