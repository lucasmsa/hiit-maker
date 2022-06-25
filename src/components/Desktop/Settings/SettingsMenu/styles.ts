import styled from 'styled-components';
import {
  LightGray,
  Rage,
  TransparentBlackShadow,
  TransparentDarkBlack,
  White
} from '../../../../styles/global';
import { ReactComponent as SettingsHeader } from '../../../../assets/images/SettingsScreen/settings-header-icon.svg';

interface SaveChangesProps {
  activated: boolean;
}

export const Container = styled.div`
  margin-left: 5%;
  margin-top: 10%;
  height: 77.5vh;
  width: 41vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${White};
  box-shadow: 0rem 0.0625rem 0.25rem ${TransparentBlackShadow};
  margin-right: 0.5rem;
  border-radius: 1.25rem;
`;

export const SettingsHeaderIcon = styled(SettingsHeader)`
  margin-top: 0.5rem;
`;

export const SettingsHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-conten: center;
`;

export const SettingsHeaderText = styled.h2`
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  margin-left: 0.75rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
`;

export const FooterContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SaveChangesContainer = styled.div<SaveChangesProps>`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1.125rem;
  height: 3.375rem;
  width: 100%;
  border-radius: 1.25rem;
  background: ${(props) => (props.activated ? TransparentDarkBlack : '#C7C7C7')};
`;

export const ScrollableExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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

export const ExercisesLimitCountText = styled.span`
  color: ${Rage};
`;

export const SettingsContentContainer = styled.div`
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SettingsConfigurationOptionContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const SettingsConfigurationOptionText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${TransparentDarkBlack};
`;

export const SettingsConfigurationOptionHighlightText = styled.span`
  color: ${Rage};
`;

export const SaveChangesText = styled.h3<SaveChangesProps>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  transition: color 0.2s ease-in-out;
  color: ${(props) => (props.activated ? LightGray : White)};
`;

export const RestoreSettingsText = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  cursor: pointer;
  letter-spacing: 0.02em;
  color: ${Rage};
  text-decoration: underline;
  align-self: center;
`;
