import React, { useContext, useMemo } from 'react'
import { ReactComponent as TargetMusclesFront } from '../../assets/images/WorkoutInformation/targetMusclesFront.svg'
import { ReactComponent as ClockIcon } from '../../assets/images/WorkoutInformation/icons/clock.svg'
import { ReactComponent as PlayButton } from '../../assets/images/WorkoutInformation/play_button.svg'
import { ReactComponent as TargetMusclesIcon } from '../../assets/images/WorkoutInformation/icons/targetMuscles.svg'
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
  StartTrainingContainer,
  HeaderContainer
} from './styles'
import { shallowEqual, useSelector } from 'react-redux'
import { getCurrentSet, getTotalTrainingTime, getTrainingSetExercises, getTrainingSetLoopQuantity } from '../../store/selectors'
import secondsToMinutes from '../../utils/secondsToMinutes'
import ExerciseSetCard from '../ExerciseSetCard'

const WorkoutInformation = () => {
  const totalTrainingTime = useSelector(getTotalTrainingTime, shallowEqual) || 0
  const formattedTotalTrainingTime = useMemo(() => secondsToMinutes(totalTrainingTime), [totalTrainingTime]);
  
  return (
    <Container>
      <TargetMusclesContainer>
        <HeaderContainer>
          <TargetMusclesIcon/>
          <HeaderTexts>Target muscles</HeaderTexts>
        </HeaderContainer>
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