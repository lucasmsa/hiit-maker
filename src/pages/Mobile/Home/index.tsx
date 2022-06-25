import React from 'react';
import { ReactComponent as BarbellInfo } from '../../../assets/images/Mobile/barbell-and-icon-responsivity.svg';
import { Container, ContentContainer, ResponsivityExplanationText } from './styles';

const MobileHome = () => {
  return (
    <Container>
      <ContentContainer>
        <BarbellInfo width={'30%'} />
        <ResponsivityExplanationText>
          We're sorry, Mobile and tablet responsivity is still being worked on, change to a desktop
          display to create your HIIT workouts!
        </ResponsivityExplanationText>
      </ContentContainer>
    </Container>
  );
};

export default MobileHome;
