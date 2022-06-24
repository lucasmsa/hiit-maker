import React from 'react';
import { ReactComponent as TargetMusclesFront } from '../../../../assets/images/WorkoutInformation/targetMusclesFront.svg';
import { ReactComponent as TargetMusclesBack } from '../../../../assets/images/WorkoutInformation/targetMusclesBack.svg';
import { ReactComponent as ColoredChestIcon } from '../../../../assets/images/WorkoutInformation/coloredChest.svg';
import { ReactComponent as ColoredAbsIcon } from '../../../../assets/images/WorkoutInformation/coloredAbs.svg';
import { ReactComponent as ColoredBackIcon } from '../../../../assets/images/WorkoutInformation/coloredBack.svg';
import { ReactComponent as ColoredLegsIcon } from '../../../../assets/images/WorkoutInformation/coloredLegs.svg';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { getAfflictedBodyParts } from '../../../../store/training/selectors';
import { BackContainer, FrontContainer } from './styles';
import { motion } from 'framer-motion/dist/framer-motion';

const MuscleGroupsSection = () => {
  const afflictedBodyParts = useSelector(getAfflictedBodyParts, shallowEqual) || {};
  const frontMuscles = [
    {
      icon: <ColoredChestIcon />,
      afflictedArea: 'Chest',
      style: {
        zIndex: 2,
        position: 'relative',
        top: '22%',
        left: '68%',
        opacity: afflictedBodyParts.Chest
      }
    },
    {
      icon: <ColoredAbsIcon />,
      afflictedArea: 'Core',
      style: {
        zIndex: 2,
        position: 'relative',
        top: '38%',
        left: '50%',
        opacity: afflictedBodyParts.Core
      }
    },
    {
      icon: <ColoredLegsIcon />,
      afflictedArea: 'Legs',
      style: { zIndex: 2, position: 'relative', top: '55%', left: '32%' }
    }
  ];

  const backMuscle = {
    icon: <ColoredBackIcon />,
    afflictedArea: 'Back',
    style: {
      zIndex: 2,
      scale: '0.9',
      position: 'relative',
      top: '13%',
      left: '50%'
    }
  };

  return (
    <>
      <FrontContainer>
        {frontMuscles.map((muscle) => {
          return (
            <motion.div
              initial={{ opacity: afflictedBodyParts[muscle.afflictedArea], ...muscle.style }}
              animate={{ opacity: afflictedBodyParts[muscle.afflictedArea], ...muscle.style }}
              transition={{ duration: 0.3 }}>
              {muscle.icon}
            </motion.div>
          );
        })}
        <TargetMusclesFront style={{ zIndex: 0 }} />
      </FrontContainer>
      <BackContainer>
        <motion.div
          initial={{ opacity: afflictedBodyParts[backMuscle.afflictedArea], ...backMuscle.style }}
          animate={{ opacity: afflictedBodyParts[backMuscle.afflictedArea], ...backMuscle.style }}
          transition={{ duration: 0.3 }}>
          {backMuscle.icon}
        </motion.div>
        <TargetMusclesBack />
      </BackContainer>
    </>
  );
};

export default connect()(MuscleGroupsSection);
