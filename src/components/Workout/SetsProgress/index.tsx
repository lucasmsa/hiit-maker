import React from 'react'
import { useSelector } from 'react-redux';
import { ReactComponent as StopButton } from '../../../assets/images/WorkoutScreen/stop_button.svg'
import { getCurrentSet } from '../../../store/selectors';
import { BottomContainer, Container, DotsContainer, ExerciseImage, ExercisesOnSetContainer, ExercisesOnSetText, ExerciseText, HeaderTextContainer, InsideSetContainer, ProgressBlock, ProgressBlockBottomText, ProgressBlockHeaderText, ProgressBlockTimesBottom, RedExerciseText, StyledConnectingLine, StyledNotSelectedSetIcon, StyledSelectedSetIcon, TrainingProgressContainer, TrainingTimeClockText, TrainingTimeContainer, TrainingTimeRedText } from './styles';

const SetsProgress = () => {
  const currentSet = useSelector(getCurrentSet);
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