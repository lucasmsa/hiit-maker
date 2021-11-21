import React, { useMemo, useState } from 'react'
import { ReactComponent as TargetMusclesFront } from '../../../assets/images/WorkoutInformation/targetMusclesFront.svg'
import { ReactComponent as TargetMusclesBack } from '../../../assets/images/WorkoutInformation/targetMusclesBack.svg'
import { ReactComponent as ClockIcon } from '../../../assets/images/WorkoutInformation/icons/clock.svg'
import { ReactComponent as TargetMusclesIcon } from '../../../assets/images/WorkoutInformation/icons/targetMuscles.svg'
import { ReactComponent as ColoredChestIcon } from '../../../assets/images/WorkoutInformation/coloredChest.svg'
import { ReactComponent as ColoredAbsIcon } from '../../../assets/images/WorkoutInformation/coloredAbs.svg'
import { ReactComponent as ColoredBackIcon } from '../../../assets/images/WorkoutInformation/coloredBack.svg'
import { ReactComponent as ColoredLegsIcon } from '../../../assets/images/WorkoutInformation/coloredLegs.svg'
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
  HeaderContainer,
  PlayButton,
  PlayButtonHovered
} from './styles'
import { toast } from 'react-hot-toast'
import { shallowEqual, useSelector } from 'react-redux'
import { getTotalTrainingTime, getAfflictedBodyParts } from '../../../store/selectors'
import secondsToMinutes from '../../../utils/secondsToMinutes'
import ErrorToast from '../../../toasts/ErrorToast'

const WorkoutInformation = () => {
  const totalTrainingTime = useSelector(getTotalTrainingTime, shallowEqual) || 0
  const afflictedBodyParts = useSelector(getAfflictedBodyParts, shallowEqual) || {}
  const formattedTotalTrainingTime = useMemo(() => secondsToMinutes(totalTrainingTime), [totalTrainingTime]);
  const [playButtonHovered, setPlayButtonHovered] = useState(false)

  const atLeastOneExerciseWasAdded = () => {
    return Object.entries(afflictedBodyParts).some(([_bodyPart, amountOfExercises]) => { 
      return amountOfExercises as number > 0
    })
  }

  const handlePlayButtonClick = () => {
    if (!atLeastOneExerciseWasAdded()) {
      toast(ErrorToast({ message: 'You must have at least one exercise to start a new training'}));
    }


  }

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
                opacity: afflictedBodyParts.Chest
              }} 
            />
            <ColoredAbsIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '38%',
                left: '50%',
                opacity: afflictedBodyParts.Core
              }} 
            />
            <ColoredLegsIcon
              style={{
                zIndex: 2,
                position: 'relative',
                top: '55%',
                left: '32%',
                opacity: afflictedBodyParts.Legs
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
        {playButtonHovered
          ? <PlayButtonHovered
              onClick={handlePlayButtonClick}
              onMouseLeave={() => setPlayButtonHovered(false)}
          />
          : <PlayButton
              onMouseEnter={() => setPlayButtonHovered(true)}
          />
        }
      </StartTrainingContainer>
    </Container>
  )
}

export default WorkoutInformation