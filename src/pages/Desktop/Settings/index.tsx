import React from 'react';
import { Link } from 'react-router-dom';
import LeftBar from '../../../components/Desktop/Home/LeftBar';
import SettingsMenu from '../../../components/Desktop/Settings/SettingsMenu';
import { BackButtonContainer, BackButtonText, Container } from './styles';
import { ReactComponent as BackButton } from '../../../assets/images/SettingsScreen/back-icon.svg';

const Settings = () => {
  return (
    <Container>
      <LeftBar isHomePage={false} />
      <BackButtonContainer>
        <Link to={'/'}>
          <BackButton />
        </Link>
        <BackButtonText>Back</BackButtonText>
      </BackButtonContainer>
      <SettingsMenu />
    </Container>
  );
};

export default Settings;
