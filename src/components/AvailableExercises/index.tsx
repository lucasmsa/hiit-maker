import { RouteHandler } from 'miragejs/server'
import React, { useEffect, useState } from 'react'
import runServer from '../../server'
import Banana from '../Banana'
import { ReactComponent as ChestIcon } from '../../assets/images/LeftBar/icons/chest_icon.svg'
import { ReactComponent as LegIcon } from '../../assets/images/LeftBar/icons/legs_icon.svg'
import { Container, ExerciseAreaText, ExerciseAreaContainer, ExercisesImagesContainer } from './styles'

interface ExercisesProps {
  chest: Exercise[] | [] | object[];
  legs: Exercise[] | [] | object[];
}

interface Exercise {
  id: string;
  name: string;
  image: string;
  restTime?: string;
}

// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }: { text: string, selected: any }) => {
  return <div>{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list: any, selected: any) =>
  list.map((exercise: Exercise) => {
    console.log('AQUI')
    console.log(exercise)
    const { image, name } = exercise;

    return <MenuItem text={name} key={name} selected={selected} />;
  });


const Arrow = ({ text }: { text: string }) => <div>{text}</div>


const ArrowLeft = Arrow({ text: '<' });
const ArrowRight = Arrow({ text: '>' });


const AvailableExercises = () => {
  runServer()
  const [selected, setSelected] = useState<string>('item1')
  const [exercises, setExercises] = useState<ExercisesProps | any>({
    chest: [],
    legs: []
  })

  useEffect(() => {
    fetch('api/exercises')
      .then((res) => res.json())
      .then((json) => {
        setExercises(json.exercises)
      })
  }, [])

  return (
    <Container>
      <ExerciseAreaContainer>
        <ChestIcon />
        <ExerciseAreaText>Chest</ExerciseAreaText>
      </ExerciseAreaContainer>
      <ExercisesImagesContainer>
        <Banana />
      </ExercisesImagesContainer>
      <ExerciseAreaContainer>
        <LegIcon />
        <ExerciseAreaText>Legs</ExerciseAreaText>
      </ExerciseAreaContainer>
    </Container>
  )
}

export default AvailableExercises