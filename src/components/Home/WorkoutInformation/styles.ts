import styled from 'styled-components';
import { DarkGray, Rage, TransparentDarkBlack, White } from '../../../styles/global';
import { ReactComponent as Clock } from '../../../assets/images/WorkoutInformation/icons/clock.svg';
import { ReactComponent as TargetMuscles } from '../../../assets/images/WorkoutInformation/icons/targetMuscles.svg';
import { ReactComponent as ManRunning } from '../../../assets/images/WorkoutInformation/icons/manRunning.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${White};
  width: 20.3125rem;
  height: 100vh;
  padding-top: 2.625rem;
  overflow-x: hidden;
`;
export const TargetMusclesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const MuscleGroupImagesContainer = styled.div`
  margin-top: 2.625rem;
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: space-around;
  align-self: center;
`;

export const TotalTimeContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TotalTimeHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderTexts = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  align-items: center;
  margin-left: 0.75rem;
  color: ${White};
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${TransparentDarkBlack};
  width: 130%;
  height: 2.875rem;
  margin-right: 2rem;
  padding-left: 3rem;
`;

export const InformationContianer = styled.div`
  display: flex;
  flex-direction: row;
  width: 130%;
  margin-right: 2.625rem;
`;

export const LemmeSee = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 2.875rem solid white;
  border-right: 1.5rem solid transparent;
`;

export const ClockText = styled.h2`
  margin-left: 0.875rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  color: ${DarkGray};
`;

export const TrainingDurationContainer = styled.div`
  align-self: center;
`;

export const TrainingDurationText = styled.h3`
  font-family: Montserrat;
  margin-top: 0.75rem;
  font-style: normal;
  font-weight: 600;
  font-size: 3rem;
  letter-spacing: 0.02em;
  color: ${Rage};
`;

export const StartTrainingContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ClockIcon = styled(Clock)`
  width: 2vw;
`;
export const TargetMusclesIcon = styled(TargetMuscles)`
  width: 2vw;
`;
export const ManRunningIcon = styled(ManRunning)`
  width: 2vw;
`;
