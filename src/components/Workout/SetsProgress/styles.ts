import styled, { keyframes } from 'styled-components';
import {
  LightGray,
  Rage,
  TransparentBlackShadow,
  TransparentDarkBlack,
  White
} from '../../../styles/global';
import { Line, Circle } from 'rc-progress';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const ExerciseText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  margin-left: 15%;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1.75rem 0;
`;

export const RedExerciseText = styled.span`
  font-weight: 600;
  color: ${Rage};
`;

export const TrainingTimeClockText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 3rem;
  line-height: 6.125rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const ExerciseImage = styled.img`
  width: 70%;
  height: 45%;
  filter: drop-shadow(0rem 0.0625rem 0.125rem ${TransparentBlackShadow});
  align-self: center;
  border-radius: 0.625rem;
  margin-bottom: 1.5rem;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 36%;
`;

export const TrainingTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 1%;
`;

export const TrainingProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TrainingTimeRedText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${Rage};
`;

export const ProgressBlock = styled.div`
  display: flex;
  border-radius: 1.25rem;
  align-self: center;
  flex-direction: column;
  background: ${White};
  width: 90%;
  box-shadow: 0rem 0.0625rem 0.25rem ${TransparentBlackShadow};
`;

export const ProgressBlockTimesBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${TransparentDarkBlack};
  width: 100%;
  height: 3rem;
  box-shadow: 0rem 0.0625rem 0.125rem rgba(238, 55, 63, 0.5);
  border-radius: 1.25rem;
  margin-top: auto;
`;

export const ProgressBlockBottomText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.2vw;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${LightGray};
`;

export const ProgressBlockHeaderText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  align-self: center;
  margin-top: 4%;
  font-size: 1rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${Rage};
  margin-bottom: 8%;
`;

export const ExercisesOnSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 3rem;
  ::-webkit-scrollbar {
    width: 0.3125rem;
  }

  ::-webkit-scrollbar-thumb {
    background: #908a8a;
    opacity: 0.8;
    border-radius: 1.25rem;
  }
`;

export const ExercisesOnSetText = styled.h2`
  font-family: Montserrat;
  width: 90%;
  font-style: normal;
  font-weight: 600;
  font-size: 90%;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
  overflow: hidden;
`;

export const InsideSetContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const DotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 5%;
`;

export const ExercisesOnSetDots = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledConnectingLine = styled.div`
  background: ${LightGray};
  width: 0.125rem;
  height: 1.75rem;
`;

interface IProgressLine {
  lastExerciseLine: boolean;
}

export const ProgressLine = styled(Line).attrs({
  strokeLinecap: 'round',
  strokeWidth: 10,
  trailWidth: 9.5,
  trailColor: LightGray
})<IProgressLine>`
  position: relative;
  width: ${({ lastExerciseLine }) => (lastExerciseLine ? '1.72rem' : '1.6rem')};
  height: 0.125rem;
  top: ${({ lastExerciseLine }) => (lastExerciseLine ? '0.9rem' : '0.85rem')};
  left: 0.05rem;
  transform: rotate(90deg);
`;

export const ProgressLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.65rem;
`;

export const SelectedDotIcon = styled.div`
  position: absolute;
  background: ${Rage};
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  top: 22.5%;
  left: 22.5%;
`;

export const DotContainer = styled.div`
  position: relative;
  width: 1.125rem;
  height: 1.125rem;
  flex-direction: column;
`;

export const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const DotIconAndProgressLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 1.25rem;
`;

export const FilledDotIcon = styled.div`
  background: ${Rage};
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
`;

export const UnfilledDotIcon = styled(FilledDotIcon)`
  background: ${LightGray};
`;

export const ProgressCircle = styled(Circle).attrs({
  strokeLinecap: 'round',
  strokeWidth: 8,
  strokeColor: Rage,
  trailWidth: 8,
  trailColor: LightGray
})`
  width: 1.25rem;
  height: 1.25rem;
`;

export const enlargingCircleAnimation = keyframes`
  0% { transform: scaleX(0.5) scaleY(0.5); }
  5% { transform: scaleX(0.525) scaleY(0.525);}
  10% { transform: scaleX(0.55) scaleY(0.55); }
  15% { transform: scaleX(0.575) scaleY(0.575); }
  20% { transform: scaleX(0.6) scaleY(0.6); }
  25% { transform: scaleX(0.625) scaleY(0.625); }
  30% { transform: scaleX(0.65) scaleY(0.65); }
  35% { transform: scaleX(0.675) scaleY(0.675); }
  40% { transform: scaleX(0.7) scaleY(0.7); }
  45% { transform: scaleX(0.725) scaleY(0.725); }
  50% { transform: scaleX(0.75) scaleY(0.75); }
  55% { transform: scaleX(0.775) scaleY(0.775); }
  60% { transform: scaleX(0.8) scaleY(0.8); }
  65% { transform: scaleX(0.825) scaleY(0.825); }
  70% { transform: scaleX(0.85) scaleY(0.85); }
  75% { transform: scaleX(0.875) scaleY(0.875); }
  80% { transform: scaleX(0.9) scaleY(0.9); }
  85% { transform: scaleX(0.925) scaleY(0.925); }
  90% { transform: scaleX(0.95) scaleY(0.95);}
  95% { transform: scaleX(0.975) scaleY(0.975); }
  100% { transform: scaleX(1) scaleY(1); }
`;

interface IEnlargingCircle {
  scaleSum: number;
}

export const EnlargingCircle = styled.div<IEnlargingCircle>`
  width: 0.75rem;
  height: 0.75rem;
  background: ${Rage};
  border-radius: 50%;
  top: 22.5%;
  left: 22.5%;
  transform: ${({ scaleSum }) => {
    console.log('I am the scaleSum', scaleSum);
    return `scaleX(${scaleSum}) scaleY(${scaleSum})`;
  }};
  position: absolute;
`;
