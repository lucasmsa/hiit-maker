import { motion } from 'framer-motion/dist/framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { exerciseHoverAnimations } from '../../../../utils/hoverAnimations';
import {
  ArrowButton,
  BalloonTip,
  Container,
  ExerciseItemContainer,
  ExerciseWithTooltipContainer,
  HorizontalScroll,
  Item,
  NotActiveItemContainer,
  ShadowLeftArrow,
  ShadowRightArrow,
  Tooltip,
  TooltipContainer,
  TooltipText
} from './styles';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface ExercisesListProps {
  list: Exercise[];
  selectedExercise: string;
  setSelectedExercise: (key: any) => void;
}

interface SingleExerciseProps {
  id: string;
  key: number;
  name: string;
  image: string;
  selectedItem: string;
  onClick: (key: any) => void;
}

interface ArrowProps {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}

const preventDefault = (ev: Event) => {
  if (ev.preventDefault) {
    ev.preventDefault();
  }
  ev.returnValue = false;
};

const enableBodyScroll = () => {
  document && document.removeEventListener('wheel', preventDefault, false);
};

const disableBodyScroll = () => {
  document &&
    document.addEventListener('wheel', preventDefault, {
      passive: false
    });
};

function usePreventBodyScroll() {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    hidden ? disableBodyScroll() : enableBodyScroll();

    return enableBodyScroll;
  }, [hidden]);

  const disableScroll = React.useCallback(() => setHidden(true), []);
  const enableScroll = React.useCallback(() => setHidden(false), []);
  return { disableScroll, enableScroll };
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

function HorizontalScrollingImages({
  selectedExercise,
  setSelectedExercise,
  list
}: ExercisesListProps) {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <Container onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
      <HorizontalScroll LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
        {list.map(({ name, image }) => (
          <Card
            itemId={name}
            key={name}
            name={name}
            image={image}
            onClick={() => {
              setSelectedExercise(name);
            }}
            selected={selectedExercise}
          />
        ))}
      </HorizontalScroll>
    </Container>
  );
}

function Arrow({ children, disabled, onClick }: ArrowProps) {
  return (
    <ArrowButton disabled={disabled} onClick={onClick} style={{ opacity: disabled ? '0' : '1' }}>
      {children}
    </ArrowButton>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <ShadowLeftArrow />
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <ShadowRightArrow />
    </Arrow>
  );
}

const SingleExercise = ({ name, image, onClick }: SingleExerciseProps) => {
  const [selectedTooltip, setSelectedTooltip] = useState<boolean>(false);

  return (
    <ExerciseItemContainer
      onMouseEnter={() => setSelectedTooltip(true)}
      onMouseLeave={() => setSelectedTooltip(false)}>
      <ExerciseWithTooltipContainer>
        <TooltipContainer selectedTooltip={selectedTooltip}>
          <Tooltip>
            <TooltipText>{name}</TooltipText>
          </Tooltip>
          <BalloonTip />
        </TooltipContainer>
      </ExerciseWithTooltipContainer>
      <NotActiveItemContainer>
        <Item
          onClick={() => {
            onClick(name);
          }}
          src={image}
        />
      </NotActiveItemContainer>
    </ExerciseItemContainer>
  );
};

function Card({
  onClick,
  selected,
  image,
  name
}: {
  itemId: string;
  onClick: any;
  selected: any;
  name: any;
  image: string;
}) {
  return (
    <motion.div
      whileHover={exerciseHoverAnimations.whileHover}
      whileTap={exerciseHoverAnimations.whileTap}>
      <SingleExercise
        key={name}
        id={name}
        image={image}
        name={name}
        selectedItem={selected}
        onClick={onClick}
      />
    </motion.div>
  );
}

export default HorizontalScrollingImages;
