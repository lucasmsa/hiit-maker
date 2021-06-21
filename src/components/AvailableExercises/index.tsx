import { RouteHandler } from 'miragejs/server'
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

export interface Exercise {
  id: number;
  name: string;
  image: string;
  restTime?: number;
  trainTime?: number;
  afflictedBodyPart: string
}


const AvailableExercises = () => {
  runServer()
  const [selectedExercise, setSelectedExercise] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chestExercises, setChestExercises] = useState<Exercise[] | []>([])
  const [legsExercises, setLegsExercises] = useState<Exercise[] | []>([])
  const [cancelButtonHover, setCancelButtonHover] = useState<boolean>(false)
  const [confirmButtonHover, setConfirmButtonHover] = useState<boolean>(false)
  const [specificExercise, setSpecificExercise] = useState<Exercise>({
    id: 0,
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
        cancelButtonActive={cancelButtonHover}
        confirmButtonActive={confirmButtonHover}
        hoverCancel={() => setCancelButtonHover(true)}
        hoverConfirm={() => setConfirmButtonHover(true)}
        unhoverCancel={() => setCancelButtonHover(false)}
        unhoverConfirm={() => setConfirmButtonHover(false)}
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