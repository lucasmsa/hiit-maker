import React from 'react'
import { useSelector } from 'react-redux';
import { AspectRatio } from 'react-aspect-ratio';
import { ReactComponent as StopButton } from '../../../assets/images/WorkoutScreen/stop_button.svg'
import { getCurrentSet, getTrainingSetExercises, getTrainSetLoops } from '../../../store/selectors';
import { BottomContainer, Container, DotsContainer, ExerciseImage, ExercisesOnSetContainer, ExercisesOnSetText, ExerciseText, HeaderTextContainer, InsideSetContainer, ProgressBlock, ProgressBlockBottomText, ProgressBlockHeaderText, ProgressBlockTimesBottom, RedExerciseText, StyledConnectingLine, StyledNotSelectedSetIcon, StyledSelectedSetIcon, TrainingProgressContainer, TrainingTimeClockText, TrainingTimeContainer, TrainingTimeRedText } from './styles';

const SetsProgress = () => {
  const trainingSets = useSelector(getTrainSetLoops);
  const currentSet = useSelector(getCurrentSet);
  const currentTrainingSetExercises = useSelector(getTrainingSetExercises)
  const setsQuantity = trainingSets.length;
  const exercisesMock = [{ name: 'SQUAT WITHOUT DUMBELLS' }, { name: 'PUSH UPS' },
    { name: 'CRUNCHES' }, { name: 'PUSH UPS' }, { name: 'CRUNCHES' },
  ]

  return (
    <Container>
      <HeaderTextContainer>
      <ExerciseText>
        EXERCISE {'1'}: 
        <RedExerciseText>
          {` ${"REGULAR SQUATS"}`.toLocaleUpperCase()}
        </RedExerciseText>
        </ExerciseText>
      </HeaderTextContainer>
        <ExerciseImage src="https://qph.fs.quoracdn.net/main-qimg-4105302bd7ccde31124497ebf4b5ce52" />
      <BottomContainer>
        <TrainingTimeContainer>
          <TrainingTimeRedText>
            {'TRAINING TIME'.toLocaleUpperCase()}
          </TrainingTimeRedText>
          <TrainingTimeClockText>
            {'00:00:60'}
          </TrainingTimeClockText>
          <StopButton />
        </TrainingTimeContainer>
        <TrainingProgressContainer>
          <ProgressBlock>
            <ProgressBlockHeaderText>
              PROGRESS
            </ProgressBlockHeaderText>
            <ExercisesOnSetContainer>
              {
                exercisesMock.map((set, index) => { 
                  const setIcon = currentSet === index
                                  ? <StyledSelectedSetIcon  />
                                  : <StyledNotSelectedSetIcon 
                                      onClick={() => {}}
                                    />
                  return (
                    <InsideSetContainer>
                      <ExercisesOnSetText
                        style={{ marginTop: index > 0 ? '28px' : 0 }}
                      >
                        {set.name}
                      </ExercisesOnSetText>
                      <DotsContainer>
                        {index !== 0 && <StyledConnectingLine />}
                        {setIcon}
                      </DotsContainer>
                    </InsideSetContainer>
                  )
                }
              )
              } 
            </ExercisesOnSetContainer>
            <ProgressBlockTimesBottom>
              <ProgressBlockBottomText>{`${'5'} Times`}</ProgressBlockBottomText>
            </ProgressBlockTimesBottom>
          </ProgressBlock>
        </TrainingProgressContainer>
      </BottomContainer>
    </Container>
  )
}


export default SetsProgress;