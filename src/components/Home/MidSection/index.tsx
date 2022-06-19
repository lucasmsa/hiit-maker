import React from 'react';
import {
  Container,
  AddSetText,
  RemoveSetText,
  SetsContainer,
  AddSetContainer,
  WorkoutContainer,
  RemoveSetContainer,
  ExercisesContainer,
  CurrentTrainingSetsContainer,
  SetsLimitText,
  SetsLimitCountText,
  HeaderInfoContainer
} from './styles';
import { ReactComponent as AddSetIcon } from '../../../assets/images/midSection/addSet.svg';
import { ReactComponent as SelectedSetIcon } from '../../../assets/images/midSection/selected-set.svg';
import { ReactComponent as NotSelectedSetIcon } from '../../../assets/images/midSection/not-selected-set.svg';
import { ReactComponent as ConnectingLine } from '../../../assets/images/midSection/connecting-line.svg';
import { ReactComponent as RemoveSetIcon } from '../../../assets/images/midSection/removeSet.svg';
import MountWorkout from '../MountWorkout';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { addSet, removeSet, updateCurrentSet } from '../../../store/training/actionCreators';
import {
  getCurrentSet,
  getTrainingSetExercises,
  getTrainSetLoops
} from '../../../store/training/selectors';
import toast from 'react-hot-toast';
import ErrorToast from '../../../toasts/ErrorToast';

const MidSection = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const trainingSets = useSelector(getTrainSetLoops);
  const currentSet = useSelector(getCurrentSet);
  const currentTrainingSetExercises = useSelector(getTrainingSetExercises);
  const setsQuantity = trainingSets.length;

  return (
    <Container>
      <HeaderInfoContainer />
      <ExercisesContainer>
        <SetsContainer>
          <SetsLimitText>
            Set Limit: <SetsLimitCountText>{setsQuantity}</SetsLimitCountText>/5
          </SetsLimitText>
          <CurrentTrainingSetsContainer>
            {trainingSets.map((set: TrainSetLoop, index: number) => {
              const setIcon =
                currentSet === index ? (
                  <SelectedSetIcon key={index} style={{ cursor: 'pointer' }} />
                ) : (
                  <NotSelectedSetIcon
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => dispatch(updateCurrentSet(index))}
                  />
                );
              if (index === 0) {
                return setIcon;
              } else {
                return (
                  <>
                    <ConnectingLine />
                    {setIcon}
                  </>
                );
              }
            })}
          </CurrentTrainingSetsContainer>
          {trainingSets.length <= 4 && (
            <AddSetContainer
              onClick={() => {
                if (currentTrainingSetExercises.length) {
                  dispatch(addSet(currentSet));
                  dispatch(updateCurrentSet(setsQuantity));
                } else {
                  toast(
                    ErrorToast({
                      message:
                        'You must have at least one exercise on the current set before you add new ones'
                    })
                  );
                }
              }}>
              <AddSetIcon />
              <AddSetText>Add set</AddSetText>
            </AddSetContainer>
          )}
          {trainingSets.length > 1 && (
            <RemoveSetContainer
              onClick={() => {
                dispatch(removeSet(currentSet));
                if (currentSet === 0) {
                  dispatch(updateCurrentSet(currentSet));
                }
              }}>
              <RemoveSetIcon />
              <RemoveSetText>Remove set</RemoveSetText>
            </RemoveSetContainer>
          )}
        </SetsContainer>
        <WorkoutContainer>
          <MountWorkout />
        </WorkoutContainer>
      </ExercisesContainer>
    </Container>
  );
};

export default MidSection;
