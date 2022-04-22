import styled from 'styled-components';
import {
  LightGray,
  Rage,
  TransparentBlackShadow,
  TransparentDarkBlack
} from '../../../styles/global';
import { ReactComponent as SelectedSetIcon } from '../../../assets/images/midSection/selected-set.svg';
import { ReactComponent as NotSelectedSetIcon } from '../../../assets/images/midSection/not-selected-set.svg';
import { ReactComponent as ConnectingLine } from '../../../assets/images/WorkoutScreen/connecting-line-workout.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
  width: 65%;
  height: 100%;
`;

export const ExerciseText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5vw;
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
  font-size: 3vw;
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
  margin-left: 0;
  margin-bottom: 0;
`;

export const TrainingProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  margin-bottom: 0;
  justify-content: flex-start;
`;

export const TrainingTimeRedText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5vw;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${Rage};
`;

export const ProgressBlock = styled.div`
  display: flex;
  border-radius: 1.25rem;
  align-self: flex-start;
  flex-direction: column;
  width: 65%;
  margin-left: 5%;
  height: 100%;
  box-shadow: 0rem 0.0625rem 0.25rem ${TransparentBlackShadow};
`;

export const ProgressBlockTimesBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${Rage};
  width: 100%;
  height: 4.5vh;
  box-shadow: 0rem 0.0625rem 0.125rem rgba(238, 55, 63, 0.5);
  border-radius: 1.25rem;
  margin-top: auto;
`;

export const ProgressBlockBottomText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1vw;
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
  font-size: 1vw;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${Rage};
  margin-bottom: 4%;
`;

export const ExercisesOnSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
  overflow-y: scroll;
  height: 70%;
  margin-bottom: 1.5rem;
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
  font-style: normal;
  font-weight: 600;
  font-size: 0.7vw;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const InsideSetContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: center;
  margin-right: 5%;
`;

export const ExercisesOnSetDots = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSelectedSetIcon = styled(SelectedSetIcon)`
  cursor: pointer;
  transform: scale(125%);
`;

export const StyledNotSelectedSetIcon = styled(NotSelectedSetIcon)`
  cursor: pointer;
`;

export const StyledConnectingLine = styled(ConnectingLine)``;
