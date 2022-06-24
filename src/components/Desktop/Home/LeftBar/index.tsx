import React, { useState } from 'react';
import {
  BrandingIcon,
  Container,
  CreateWorkoutHeaderDescriptionContainer,
  GithubIcon,
  GithubIconLink,
  Header,
  IconsContainer,
  SettingsIcon
} from './styles';
import { Link } from 'react-router-dom';
import AvailableExercises from '../AvailableExercises';
import Search from '../Search';
import { GITHUB_LINK } from '../../../../config/contants';
import InformationHeaderSection from '../InformationHeaderSection';
import { HorizontalDumbell } from '../MidSection/styles';

interface LeftBarProps {
  isHomePage: boolean;
}

const LeftBar = ({ isHomePage }: LeftBarProps) => {
  const [searchExercise, setExerciseSearch] = useState<string>('');
  return (
    <>
      <Container>
        <Header>
          <BrandingIcon />
        </Header>
        <IconsContainer>
          <GithubIconLink href={GITHUB_LINK} target="_blank">
            <GithubIcon />
          </GithubIconLink>
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

      <CreateWorkoutHeaderDescriptionContainer>
        {isHomePage && (
          <InformationHeaderSection
            title="Create your workout with a few steps"
            backgroundColor="RED"
            icon={<HorizontalDumbell />}
            reverse
          />
        )}
      </CreateWorkoutHeaderDescriptionContainer>
    </>
  );
};

export default LeftBar;
