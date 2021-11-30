import React from 'react'
import { useSelector } from 'react-redux';
import { getCurrentSet, getTrainingSetExercises, getTrainSetLoops } from '../../../store/selectors';
import { BottomContainer, Container, ExerciseImage, ExerciseText, HeaderTextContainer, RedExerciseText, TrainingProgressContainer, TrainingTimeContainer, TrainingTimeRedText } from './styles';

const SetsProgress = () => {
  const trainingSets = useSelector(getTrainSetLoops);
  const currentSet = useSelector(getCurrentSet);
  const currentTrainingSetExercises = useSelector(getTrainingSetExercises)
  const setsQuantity = trainingSets.length;

  return (
    <Container>
      <HeaderTextContainer>
      <ExerciseText>
        EXERCISE {'1'}: 
        <RedExerciseText>
          {' REGULAR SQUATS'.toLocaleUpperCase()}
        </RedExerciseText>
        </ExerciseText>
      </HeaderTextContainer>
      <ExerciseImage src={'https://qph.fs.quoracdn.net/main-qimg-4105302bd7ccde31124497ebf4b5ce52'} />
      <BottomContainer>
        <TrainingTimeContainer>
          <TrainingTimeRedText>
            {'TRAINING TIME'.toLocaleUpperCase()}
          </TrainingTimeRedText>
        </TrainingTimeContainer>
        <TrainingProgressContainer>
          
        </TrainingProgressContainer>
      </BottomContainer>
    </Container>
  )
}


export default  SetsProgress;