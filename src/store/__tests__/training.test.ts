import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExercise, addSet } from '../training/actionCreators';
import { trainingInitialState } from '../training/trainingReducer';

const mockStore = configureMockStore([thunk]);

describe('Training actions creators', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      training: trainingInitialState
    });
  });

  describe('Add set action', () => {
    it('should successfully add a new set to the training', () => {
      console.log('eu to nesse teste?');
      console.log(store.getState().training.trainSetLoops);
      store.dispatch(addSet());
      store.dispatch(
        addExercise({
          image: 'oi',
          name: 'a',
          restTime: 2,
          trainTime: 1,
          afflictedBodyPart: 'Chest'
        })
      );
      console.log(store.getState().training.trainSetLoops);
    });
  });
});
