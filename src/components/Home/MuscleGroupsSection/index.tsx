import React from 'react';
import { ReactComponent as TargetMusclesFront } from '../../../assets/images/WorkoutInformation/targetMusclesFront.svg';
import { ReactComponent as TargetMusclesBack } from '../../../assets/images/WorkoutInformation/targetMusclesBack.svg';
import { ReactComponent as ColoredChestIcon } from '../../../assets/images/WorkoutInformation/coloredChest.svg';
import { ReactComponent as ColoredAbsIcon } from '../../../assets/images/WorkoutInformation/coloredAbs.svg';
import { ReactComponent as ColoredBackIcon } from '../../../assets/images/WorkoutInformation/coloredBack.svg';
import { ReactComponent as ColoredLegsIcon } from '../../../assets/images/WorkoutInformation/coloredLegs.svg';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { getAfflictedBodyParts } from '../../../store/training/selectors';
import { BackContainer, FrontContainer } from './styles';

const MuscleGroupsSection = () => {
  const afflictedBodyParts = useSelector(getAfflictedBodyParts, shallowEqual) || {};

  return (
    <>
      <FrontContainer>
        <ColoredChestIcon
          style={{
            zIndex: 2,
            position: 'relative',
            top: '22%',
            left: '68%',
            opacity: afflictedBodyParts.Chest
          }}
        />
        <ColoredAbsIcon
          style={{
            zIndex: 2,
            position: 'relative',
            top: '38%',
            left: '50%',
            opacity: afflictedBodyParts.Core
          }}
        />
        <ColoredLegsIcon
          style={{
            zIndex: 2,
            position: 'relative',
            top: '55%',
            left: '32%',
            opacity: afflictedBodyParts.Legs
          }}
        />
        <TargetMusclesFront style={{ zIndex: 0 }} />
      </FrontContainer>
      <BackContainer>
        <ColoredBackIcon
          style={{
            zIndex: 2,
            position: 'relative',
            top: '18%',
            left: '50%',
            opacity: afflictedBodyParts.Back
          }}
        />
        <TargetMusclesBack />
      </BackContainer>
    </>
  );
};

export default connect()(MuscleGroupsSection);
