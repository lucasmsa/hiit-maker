import React, { useState } from 'react';
import {
  Container,
  GithubIcon,
  GithubIconLink,
  Header,
  IconsContainer,
  InformationIcon,
  SettingsIcon
} from './styles';
import { ReactComponent as Branding } from '../../../assets/images/LeftBar/branding.svg';
import { Link } from 'react-router-dom';
import AvailableExercises from '../AvailableExercises';
import Search from '../Search';
import { GITHUB_LINK } from '../../../config/contants';

interface LeftBarProps {
  isHomePage: boolean;
}

const LeftBar = ({ isHomePage }: LeftBarProps) => {
  const [searchExercise, setExerciseSearch] = useState<string>('');
  return (
    <Container>
      <Header>
        <Branding />
      </Header>
      <IconsContainer>
        <GithubIconLink href={GITHUB_LINK} target="_blank">
          <GithubIcon />
        </GithubIconLink>
        <InformationIcon />
        <Link to="/settings">
          <SettingsIcon />
        </Link>
      </IconsContainer>
      {isHomePage ? (
        <>
          <Search changeExerciseSearch={(value: string) => setExerciseSearch(value)} />
          <AvailableExercises searchExercise={searchExercise} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default LeftBar;
