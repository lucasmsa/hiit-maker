import React, { useContext } from 'react'
import { ReactComponent as TargetMusclesFront } from '../../assets/images/WorkoutInformation/targetMusclesFront.svg'
import { ReactComponent as ClockIcon } from '../../assets/images/WorkoutInformation/icons/clock.svg'
import { ReactComponent as PlayButton } from '../../assets/images/WorkoutInformation/play_button.svg'
import {
  Container,
  TargetMusclesContainer,
  HeaderTexts,
  MuscleGroupImagesContainer,
  TotalTimeContainer,
  ClockText,
  TotalTimeHeaderContainer,
  TrainingDurationContainer,
  TrainingDurationText,
  StartTrainingContainer
} from './styles'

const WorkoutInformation = () => {
  return (
    <Container>
      <TargetMusclesContainer>
        <HeaderTexts>Target muscles</HeaderTexts>
        <MuscleGroupImagesContainer>
          <TargetMusclesFront />
        </MuscleGroupImagesContainer>
      </TargetMusclesContainer>
      <TotalTimeContainer>
        <TotalTimeHeaderContainer>
          <ClockIcon />
          <ClockText>Total Time</ClockText>
        </TotalTimeHeaderContainer>
        <TrainingDurationContainer>
          <TrainingDurationText>0 min</TrainingDurationText>
        </TrainingDurationContainer>
      </TotalTimeContainer>
      <StartTrainingContainer>
        <HeaderTexts>Start now</HeaderTexts>
        <PlayButton style={{ marginTop: '36px' }} />
      </StartTrainingContainer>
    </Container>
  )
}

export default WorkoutInformation