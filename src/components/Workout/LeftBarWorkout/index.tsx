import React, { useState } from 'react';
import {
  CollapsedArrowContainer,
  CollapsedArrowLeft,
  CollapsedArrowRight,
  CollapsedContainer,
  CollapsedContainerWrapper,
  HeaderWorkout,
  WorkoutContainer
} from './styles';
import { ReactComponent as Branding } from '../../../assets/images/LeftBar/branding.svg';

const LeftBarWorkout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <WorkoutContainer>
      <HeaderWorkout>
        <Branding />
      </HeaderWorkout>
      <CollapsedArrowContainer onClick={() => setIsOpen(false)}>
        <CollapsedArrowLeft />
      </CollapsedArrowContainer>
    </WorkoutContainer>
  ) : (
    <CollapsedContainerWrapper>
      <CollapsedContainer>
        <CollapsedArrowContainer onClick={() => setIsOpen(true)}>
          <CollapsedArrowRight />
        </CollapsedArrowContainer>
      </CollapsedContainer>
    </CollapsedContainerWrapper>
  );
};

export default LeftBarWorkout;
