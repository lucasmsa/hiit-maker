import styled from 'styled-components';
import { Rage } from '../../../../styles/global';
import { ReactComponent as Branding } from '../../../../assets/images/LeftBar/branding.svg';
import { ReactComponent as Information } from '../../../../assets/images/LeftBar/icons/information-icon.svg';
import { ReactComponent as Github } from '../../../../assets/images/LeftBar/icons/github-icon.svg';
import { ReactComponent as Settings } from '../../../../assets/images/LeftBar/icons/settings-icon.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Rage};
  width: 24vw;
  height: 100vh;
  padding-top: 2vw;
`;

export const Header = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
`;

export const IconsContainer = styled.div`
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const SettingsIcon = styled(Settings)`
  margin-top: 0.125rem;
  width: 2.5vw;
  cursor: pointer;
`;

export const GithubIcon = styled(Github)`
  cursor: pointer;
  width: 2.5vw;
`;

export const InformationIcon = styled(Information)`
  cursor: pointer;
  width: 2.5vw;
`;

export const GithubIconLink = styled.a``;

export const BrandingIcon = styled(Branding)`
  width: 15vw;
`;

export const CreateWorkoutHeaderDescriptionContainer = styled.div`
  position: absolute;
  left: 22vw;
  top: 2vh;
`;
