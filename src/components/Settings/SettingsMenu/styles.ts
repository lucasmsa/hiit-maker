import styled from 'styled-components';
import {
  LightGray,
  Rage,
  TransparentBlackShadow,
  TransparentDarkBlack,
  White
} from '../../../styles/global';
import { ReactComponent as SettingsHeader } from '../../../assets/images/SettingsScreen/settings-header-icon.svg';

export const Container = styled.div`
  margin-left: 16%;
  margin-top: 10%;
  height: 77.5vh;
  width: 41.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${White};
  box-shadow: 0px 1px 4px ${TransparentBlackShadow};
  margin-right: 8px;
  border-radius: 20px;
`;

export const SettingsHeaderIcon = styled(SettingsHeader)`
  margin-top: 8px;
`;

export const SettingsHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-conten: center;
`;

export const SettingsHeaderText = styled.h2`
  margin-top: 20px;
  margin-bottom: 12px;
  margin-left: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
`;

export const FooterContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SetRestTest = styled.h2`
  margin-top: 20px;
  margin-bottom: 8px;
  user-select: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const SetRestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const SetCounter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  height: 54px;
  width: 100%;
  border-radius: 20px;
  background: ${TransparentDarkBlack};
`;

export const CounterText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  user-select: none;
  color: ${LightGray};
`;

export const OperationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
  width: 30px;
`;

export const ScrollableExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin-bottom: 24px;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #908a8a;
    opacity: 0.8;
    border-radius: 20px;
  }
`;

export const ExercisesLimitText = styled.h2`
  align-self: center;
  font-family: Montserrat;
  font-style: normal;
  user-select: none;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
  margin-bottom: 20px;
`;

export const ExercisesLimitCountText = styled.span`
  color: ${Rage};
`;
