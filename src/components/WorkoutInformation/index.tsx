import React, { useMemo } from 'react'
import { ReactComponent as TargetMusclesFront } from '../../assets/images/WorkoutInformation/targetMusclesFront.svg'
import { ReactComponent as TargetMusclesBack } from '../../assets/images/WorkoutInformation/targetMusclesBack.svg'
import { ReactComponent as ClockIcon } from '../../assets/images/WorkoutInformation/icons/clock.svg'
import { ReactComponent as PlayButton } from '../../assets/images/WorkoutInformation/play_button.svg'
import { ReactComponent as TargetMusclesIcon } from '../../assets/images/WorkoutInformation/icons/targetMuscles.svg'
import { ReactComponent as ColoredChestIcon } from '../../assets/images/WorkoutInformation/coloredChest.svg'
import { ReactComponent as ColoredAbsIcon } from '../../assets/images/WorkoutInformation/coloredAbs.svg'
import { ReactComponent as ColoredBackIcon } from '../../assets/images/WorkoutInformation/coloredBack.svg'
import { ReactComponent as ColoredLegsIcon } from '../../assets/images/WorkoutInformation/coloredLegs.svg'
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
  FrontContainer,
  BackContainer,
  HeaderContainer
} from './styles'
import { shallowEqual, useSelector } from 'react-redux'
import { getTotalTrainingTime, getAfflictedBodyParts } from '../../store/selectors'
import secondsToMinutes from '../../utils/secondsToMinutes'

const WorkoutInformation = () => {
  const totalTrainingTime = useSelector(getTotalTrainingTime, shallowEqual) || 0
  const afflictedBodyParts = useSelector(getAfflictedBodyParts, shallowEqual) || {}
  const formattedTotalTrainingTime = useMemo(() => secondsToMinutes(totalTrainingTime), [totalTrainingTime]);
  
  return (
    <Container>
      <TargetMusclesContainer>
        <HeaderContainer>
          <TargetMusclesIcon/>
          <HeaderTexts>Target muscles</HeaderTexts>
        </HeaderContainer>
        <MuscleGroupImagesContainer>
          <FrontContainer>
            <ColoredChestIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '22%',
                left: '68%',
                opacity: afflictedBodyParts.Chest ? 1 : 0
              }} 
            />
            <ColoredAbsIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '38%',
                left: '50%',
                opacity: afflictedBodyParts.Core ? 1 : 0
              }} 
            />
            <ColoredLegsIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '55%',
                left: '32%',
                opacity: afflictedBodyParts.Legs ? 1 : 0
              }} 
            />
            <TargetMusclesFront
              style={{ zIndex: 0 }} 
            />
          </FrontContainer>
          <BackContainer>
            <ColoredBackIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '18%',
                left: '50%',
                opacity: afflictedBodyParts.Back
              }} 
            />
            <TargetMusclesBack />
          </BackContainer>
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