import React, { Component, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { ReactComponent as RightArrow } from '../../assets/images/LeftBar/icons/right_arrow.svg'
import { ReactComponent as LeftArrow } from '../../assets/images/LeftBar/icons/left_arrow.svg'
import { Exercise } from '../AvailableExercises'
import { App, ActiveItem, NotActiveItem } from './styles';

interface ExercisesListProps {
  list: Exercise[]
}

const SingleExercise = ({ image, selected }: { image: any, selected: any }) => {
  return selected
    ? <ActiveItem src={image} />
    : <NotActiveItem src={image} />
};

export const ExercisesContainer = (list: any, selected: any) =>
  list.map((el: any) => {
    const { id, name, image } = el;

    return <SingleExercise image={image} key={id} selected={selected} />;
  });

const selected = 'item1';

const HorizontalScrollingImages = ({ list }: ExercisesListProps) => {
  const [selectedItem, setSelectedItem] = useState<any>('item1')
  const exercisesList = ExercisesContainer(list, selected)

  return (
    <App>
      <ScrollMenu
        data={exercisesList}
        arrowLeft={/*<LeftArrow style={{ cursor: 'pointer' }} />*/null}
        arrowRight={/*<RightArrow style={{ cursor: 'pointer' }} */null}
        selected={selectedItem}
        onSelect={(key: any) => setSelectedItem(key)}
      />
    </App>
  );
}

export default HorizontalScrollingImages