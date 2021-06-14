import React, { Component, useEffect, useState } from 'react';
import { Exercise } from '../AvailableExercises'
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
  id: number;
  key: number;
  name: string;
  image: string;
  index: number;
  selectedItem: string;
}

const SingleExercise = ({ id, name, image, index, selectedItem }: SingleExerciseProps) => {
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
      {parseInt(selectedItem) === id ?
        <ActiveItemContainer>
          <Item
            src={image}
          />
        </ActiveItemContainer> :
        <NotActiveItemContainer>
          <Item
            src={image}
            />
        </NotActiveItemContainer>}
    </ExerciseItemContainer>
  )
};

export const ExercisesContainer = (list: any, selected: any) =>
  list.map((el: any, index: number) => {
    const { id, name, image } = el;
    console.log(id, name, image, selected);
    return <SingleExercise
      key={id}
      id={id} 
      image={image} 
      name={name} 
      index={index}
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