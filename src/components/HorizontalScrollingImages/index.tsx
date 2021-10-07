import React, { useState } from 'react';
import {
  Container,
  Item,
  HorizontalScroll,
  ShadowLeftArrow,
  ShadowRightArrow,
  TooltipText,
  TooltipContainer,
  ExerciseItemContainer,
  Tooltip,
  BalloonTip,
  ActiveItemContainer,
  NotActiveItemContainer,
  ExerciseWithTooltipContainer,
} from './styles';

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
}

const SingleExercise = ({ id, name, image, selectedItem }: SingleExerciseProps) => {
  const [selectedTooltip, setSelectedTooltip] = useState<boolean>(false)

  return (
    <ExerciseItemContainer
      onMouseEnter={() => setSelectedTooltip(true)}
      onMouseLeave={() => setSelectedTooltip(false)}
    >
      <ExerciseWithTooltipContainer>
        <TooltipContainer
          selectedTooltip={selectedTooltip}
        >
          <Tooltip>
            <TooltipText>{name}</TooltipText>
          </Tooltip>
          <BalloonTip />
        </TooltipContainer>
      </ExerciseWithTooltipContainer>
      <NotActiveItemContainer>
        <Item
          src={image}
        />
      </NotActiveItemContainer> 
    </ExerciseItemContainer>
  )
};

export const ExercisesContainer = (list: any, selected: any) =>
  list.map((element: any, index: number) => {
    const { name, image } = element;
    return <SingleExercise
      key={name}
      id={name} 
      image={image} 
      name={name} 
      selectedItem={selected}
    />;
  });

const ArrowLeft = <ShadowLeftArrow />
const ArrowRight = <ShadowRightArrow />

const HorizontalScrollingImages = ({ list, selectedExercise, setSelectedExercise }: ExercisesListProps) => {
  const exercisesList = ExercisesContainer(list, selectedExercise)

  return (
    <Container>
      <HorizontalScroll
        data={exercisesList}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        hideSingleArrow={true}
        selected={selectedExercise}
        onSelect={setSelectedExercise}
      />
    </Container >
  );
}

export default HorizontalScrollingImages