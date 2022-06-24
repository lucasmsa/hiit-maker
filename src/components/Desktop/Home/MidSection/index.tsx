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
  HeaderInfoContainer,
  ConnectingLineWithDotContainer,
  ConnectingLine
} from './styles';
import { ReactComponent as AddSetIcon } from '../../../../assets/images/midSection/addSet.svg';
import { ReactComponent as SelectedSetIcon } from '../../../../assets/images/midSection/selected-set.svg';
import { ReactComponent as NotSelectedSetIcon } from '../../../../assets/images/midSection/not-selected-set.svg';
import { ReactComponent as RemoveSetIcon } from '../../../../assets/images/midSection/removeSet.svg';
import MountWorkout from '../MountWorkout';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { addSet, removeSet, updateCurrentSet } from '../../../../store/training/actionCreators';
import {
  getCurrentSet,
  getTrainingSetExercises,
  getTrainSetLoops
} from '../../../../store/training/selectors';
import toast from 'react-hot-toast';
import ErrorToast from '../../../../toasts/ErrorToast';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const MidSection = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const trainingSets = useSelector(getTrainSetLoops);
  const currentSet = useSelector(getCurrentSet);
  const currentTrainingSetExercises = useSelector(getTrainingSetExercises);
  const setsQuantity = trainingSets.length;
  const progressLineAnimation = {
    initial: { offsetDistance: '0%', scale: 1.5 },
    animate: { offsetDistance: '50%', scale: 1 },
    transition: { duration: 0.3 }
  };

  return (
    <Container>
      <HeaderInfoContainer />
      <ExercisesContainer>
        <SetsContainer>
          <SetsLimitText>
            Sets Limit: <SetsLimitCountText>{setsQuantity}</SetsLimitCountText>/5
          </SetsLimitText>
          <CurrentTrainingSetsContainer>
            <AnimatePresence>
              {trainingSets.map((_set: TrainSetLoop, index: number) => {
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
                    <motion.div
                      initial={progressLineAnimation.initial}
                      animate={progressLineAnimation.animate}
                      transition={progressLineAnimation.transition}>
                      <ConnectingLineWithDotContainer>
                        <ConnectingLine />
                        <AnimatePresence>{setIcon}</AnimatePresence>
                      </ConnectingLineWithDotContainer>
                    </motion.div>
                  );
                }
              })}
            </AnimatePresence>
          </CurrentTrainingSetsContainer>
          {trainingSets.length <= 4 && (
            <AddSetContainer
              onClick={() => {
                if (currentTrainingSetExercises.length) {
                  dispatch(addSet());
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
