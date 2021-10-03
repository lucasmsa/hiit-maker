import runServer from '../../server'
import MuscleGroupList from '../HorizontalScrollingImages'
import React, { SetStateAction, useCallback, useEffect, useState } from 'react'
import { ReactComponent as ChestIcon } from '../../assets/images/LeftBar/icons/chest_icon.svg'
import ExerciseModal from '../InsertExerciseModal'
import Chest from '../../database/chest.json'
import Legs from '../../database/legs.json'
import { ReactComponent as LegIcon } from '../../assets/images/LeftBar/icons/legs_icon.svg'
import {
  Container,
  ExerciseAreaText, 
  ExerciseAreaContainer, 
  ExercisesImagesContainer
} from './styles'

interface IExerciseJSON {
  exercises: {
    [exerciseName: string]: string
  }
}

const exerciseJSONs = {
  "Chest": Chest as IExerciseJSON,
  "Legs": Legs as IExerciseJSON,
  "Back": {} as IExerciseJSON,
  "Abdomen": {} as IExerciseJSON,
}

const AvailableExercises = () => {
  runServer()
  console.log(Chest)
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


  const fillBodyPartExercises = (
    setBodyPartExercises: (value: Exercise[] | ((prevVar: Exercise[]) => Exercise[])) => void,
    bodyPart: AfflictedAreas) => {
    for (let [exerciseName, exerciseImage] of Object.entries(exerciseJSONs[bodyPart].exercises)) {
      setBodyPartExercises((bodyPartExercises: Exercise[]) => [...bodyPartExercises, {
        name: exerciseName,
        image: exerciseImage,
        afflictedBodyPart: bodyPart,
        restTime: 30,
        trainTime: 60
      }])
    }
  }

  const loadExercises = useCallback(() => {
    fillBodyPartExercises(setChestExercises, 'Chest')
    fillBodyPartExercises(setLegsExercises, 'Legs')
  }, [])

  useEffect(() => {
    loadExercises()
  }, [loadExercises])

  const handleSpecificExercise = useCallback((exerciseName: string, bodyPart: AfflictedAreas) => {
    const exerciseImage = exerciseJSONs[bodyPart].exercises[exerciseName]
    setSpecificExercise({
      name: exerciseName,
      image: exerciseImage,
      afflictedBodyPart: bodyPart,
      restTime: 30,
      trainTime: 60
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
            handleSpecificExercise(key, "Chest")
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
            handleSpecificExercise(key, "Legs")
            setModalOpen(true)
          }}
          list={legsExercises}
        />
      </ExercisesImagesContainer>

    </Container>
  )
}

export default AvailableExercises