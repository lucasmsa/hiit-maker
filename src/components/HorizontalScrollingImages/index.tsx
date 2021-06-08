import React, { Component, useEffect, useState } from 'react';
import { Exercise } from '../AvailableExercises'
import {
  Container,
  ActiveItem,
  NotActiveItem,
  HorizontalScroll,
  ShadowLeftArrow,
  ShadowRightArrow,
  TooltipText,
  TooltipContainer,
  ExerciseItemContainer,
  Tooltip,
  BalloonTip,
  NotActiveItemContainer,
} from './styles';
import ReactTooltip from 'react-tooltip';

interface ExercisesListProps {
  list: Exercise[]
}

interface SingleExerciseProps {
  key: string;
  name: string;
  image: string;
  index: number;
}

const SingleExercise = ({ key, name, image, index }: SingleExerciseProps) => {
  const [selectedTooltip, setSelectedTooltip] = useState<boolean>(false)

  return (
    <ExerciseItemContainer
      onMouseEnter={() => setSelectedTooltip(true)}
      onMouseLeave={() => setSelectedTooltip(false)}
    >
      <NotActiveItemContainer>
        <TooltipContainer
          selectedTooltip={selectedTooltip}
        >
          <Tooltip>
            <TooltipText>{name}</TooltipText>
          </Tooltip>
          <BalloonTip />
        </TooltipContainer>
      </NotActiveItemContainer>
      <NotActiveItem
        src={image} />
    </ExerciseItemContainer>
  )
};

export const ExercisesContainer = (list: any) =>
  list.map((el: any, index: number) => {
    const { id, name, image } = el;

    return <SingleExercise key={id} image={image} name={name} index={index} />;
  });



const HorizontalScrollingImages = ({ list }: ExercisesListProps) => {
  const [selectedItem, setSelectedItem] = useState<any>('item1')
  const exercisesList = ExercisesContainer(list)

  const onDragEnd = (result: any) => { }

  return (
    <Container>
      <ReactTooltip id="exercise" />
      <HorizontalScroll
        data={exercisesList}
        arrowLeft={<ShadowLeftArrow />}
        arrowRight={<ShadowRightArrow />}
        selected={selectedItem}
        onSelect={(key: any) => setSelectedItem(key)}
      />
    </Container >
  );
}

export default HorizontalScrollingImages