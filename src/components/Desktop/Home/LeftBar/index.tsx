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
import { motion } from 'framer-motion/dist/framer-motion';
import { iconHoverAnimations } from '../../../../utils/hoverAnimations';

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
          <motion.div
            whileHover={iconHoverAnimations.whileHover}
            whileTap={iconHoverAnimations.whileTap}>
            <GithubIconLink href={GITHUB_LINK} target="_blank">
              <GithubIcon />
            </GithubIconLink>
          </motion.div>
          <motion.div
            whileHover={iconHoverAnimations.whileHover}
            whileTap={iconHoverAnimations.whileTap}>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </motion.div>
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
