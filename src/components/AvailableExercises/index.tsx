import { RouteHandler } from 'miragejs/server'
import React, { useEffect, useState } from 'react'
import runServer from '../../server'
import MuscleGroupList from '../HorizontalScrollingImages'
import { ReactComponent as ChestIcon } from '../../assets/images/LeftBar/icons/chest_icon.svg'
import { ReactComponent as LegIcon } from '../../assets/images/LeftBar/icons/legs_icon.svg'
import { Container, ExerciseAreaText, ExerciseAreaContainer, ExercisesImagesContainer } from './styles'

interface ExercisesProps {
  chest: Exercise[] | [] | object[];
  legs: Exercise[] | [] | object[];
}

export interface Exercise {
  id: string;
  name: string;
  image: string;
  restTime?: string;
}

const AvailableExercises = () => {
  runServer()
  const [selectedExercise, setSelectedExercise] = useState<string>('')
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
        <MuscleGroupList
          selectedExercise={selectedExercise}
          setSelectedExercise={(key: any) => {
            console.log(key)
            setSelectedExercise(key)
          }}
          list={exercises.chest}
        />
      </ExercisesImagesContainer>
      <ExerciseAreaContainer>
        <LegIcon />
        <ExerciseAreaText>Legs</ExerciseAreaText>
      </ExerciseAreaContainer>
      <ExercisesImagesContainer>
        <MuscleGroupList
          selectedExercise={selectedExercise}
          setSelectedExercise={(key: any) => {
            console.log(key)
            setSelectedExercise(key)
          }}
          list={exercises.legs}
        />
      </ExercisesImagesContainer>

    </Container>
  )
}

export default AvailableExercises