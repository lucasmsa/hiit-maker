import React, { useContext, useMemo } from 'react'
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
import { shallowEqual, useSelector } from 'react-redux'
import { getTotalTrainingTime } from '../../store/selectors'
import secondsToMinutes from '../../utils/secondsToMinutes'

const WorkoutInformation = () => {
  const totalTrainingTime = useSelector(getTotalTrainingTime, shallowEqual) || 0
  const formattedTotalTrainingTime = useMemo(() => secondsToMinutes(totalTrainingTime), [totalTrainingTime]);
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
          <TrainingDurationText>{formattedTotalTrainingTime} min</TrainingDurationText>
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