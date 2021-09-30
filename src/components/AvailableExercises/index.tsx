import runServer from '../../server'
import MuscleGroupList from '../HorizontalScrollingImages'
import React, { useCallback, useEffect, useState } from 'react'
import { ReactComponent as ChestIcon } from '../../assets/images/LeftBar/icons/chest_icon.svg'
import ExerciseModal from '../InsertExerciseModal'
import { ReactComponent as LegIcon } from '../../assets/images/LeftBar/icons/legs_icon.svg'
import {
  Container,
  ExerciseAreaText, 
  ExerciseAreaContainer, 
  ExercisesImagesContainer
} from './styles'

interface ExercisesProps {
  legs: Exercise[] | [] | object[];
  chest: Exercise[] | [] | object[];
}

const AvailableExercises = () => {
  runServer()
  const [selectedExercise, setSelectedExercise] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chestExercises, setChestExercises] = useState<Exercise[] | []>([])
  const [legsExercises, setLegsExercises] = useState<Exercise[] | []>([])
  const [specificExercise, setSpecificExercise] = useState<Exercise>({
    name: '',
    afflictedBodyPart: '',
    image: '', 
    restTime: 30,
    trainTime: 60
  })

  const loadExercises = useCallback(() => {
    fetch('api/exercises')
      .then((res) => res.json())
      .then((allExercises: {exercises: Exercise[]}) => {
        allExercises.exercises.forEach((exercise: Exercise) => {
          let { afflictedBodyPart } = exercise
          switch (afflictedBodyPart) {
            case 'chest':
            setChestExercises(chestExercises => [...chestExercises, exercise])
            break;
            
            case 'legs':
            setLegsExercises(legsExercises => [...legsExercises, exercise])
            break;  
        }
        })
      })
  }, [])

  useEffect(() => {
    loadExercises()
  }, [loadExercises])

  const handleSpecificExercise = useCallback((key: string) => {
    fetch(`api/exercises/${key}`)
      .then((res) => res.json())
      .then((exerciseInfo) => {
        setSpecificExercise(exerciseInfo)
      })
  }, [])

  return (
    <Container>
      <ExerciseModal
        modalOpen={modalOpen}
        specificExercise={specificExercise}
        closeModal={() => setModalOpen(false)}
      />
      <ExerciseAreaContainer>
        <ChestIcon />
        <ExerciseAreaText>Chest</ExerciseAreaText>
      </ExerciseAreaContainer>
      <ExercisesImagesContainer>
        <MuscleGroupList
          selectedExercise={selectedExercise}
          setSelectedExercise={(key: any) => {
            setSelectedExercise(key)
            handleSpecificExercise(key)
            setModalOpen(true)
          }}
          list={chestExercises}
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
            setSelectedExercise(key)
            handleSpecificExercise(key)
            setModalOpen(true)
          }}
          list={legsExercises}
        />
      </ExercisesImagesContainer>

    </Container>
  )
}

export default AvailableExercises