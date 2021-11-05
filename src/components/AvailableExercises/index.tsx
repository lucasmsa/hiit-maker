import MuscleGroupList from '../HorizontalScrollingImages'
import React, { useCallback, useEffect, useState } from 'react'
import { ReactComponent as ChestIcon } from '../../assets/images/LeftBar/icons/chest_icon.svg'
import { ReactComponent as LegIcon } from '../../assets/images/LeftBar/icons/legs_icon.svg'
import { ReactComponent as BackIcon } from '../../assets/images/LeftBar/icons/back_icon.svg'
import { ReactComponent as CoreIcon } from '../../assets/images/LeftBar/icons/core_icon.svg'
import ExerciseModal from '../InsertExerciseModal'
import Chest from '../../database/chest.json'
import Legs from '../../database/legs.json'
import Back from '../../database/back.json'
import Core from '../../database/core.json'
import {
  Container,
  ExerciseAreaContainer,
  ExerciseAreaText, 
  ExerciseHeaderContainer, 
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
  "Back": Back as IExerciseJSON,
  "Core": Core as IExerciseJSON,
}

const AvailableExercises = () => {
  console.log(Chest)
  const [selectedExercise, setSelectedExercise] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chestExercises, setChestExercises] = useState<Exercise[] | []>([])
  const [legsExercises, setLegsExercises] = useState<Exercise[] | []>([])
  const [coreExercises, setCoreExercises] = useState<Exercise[] | []>([])
  const [backExercises, setBackExercises] = useState<Exercise[] | []>([])
  const [specificExercise, setSpecificExercise] = useState<Exercise>({
    name: '',
    afflictedBodyPart: '',
    image: '', 
    restTime: 30,
    trainTime: 60
  })
  
  const exerciseContainerObject = (icon: JSX.Element, list: [] | Exercise[]) => ({
    "Icon": icon, "list": list
  })

  const exerciseContainer = [
    { "Chest": exerciseContainerObject(<ChestIcon />, chestExercises) },
    { "Legs": exerciseContainerObject(<LegIcon />, legsExercises) },
    { "Back": exerciseContainerObject(<BackIcon />, backExercises) },
    { "Core": exerciseContainerObject(<CoreIcon />, coreExercises) }
  ]

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
    [{ 'Chest': setChestExercises }, { 'Legs': setLegsExercises }, { 'Back': setBackExercises }, { 'Core': setCoreExercises }].map((exercise) => {
      const afflictedBodyPart = Object.keys(exercise)[0] as AfflictedAreas
      const setBodyPartExercises = Object.values(exercise)[0] as (value: Exercise[] | ((prevVar: Exercise[]) => Exercise[])) => void

      return fillBodyPartExercises(setBodyPartExercises, afflictedBodyPart)
    })
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
      
       {exerciseContainer.map((element: any, index) => {
        const bodyPart = Object.keys(element)[0] as AfflictedAreas
        const icon = element[bodyPart].Icon
        const exerciseList = element[bodyPart].list

         return (
          <ExerciseAreaContainer>
            <ExerciseHeaderContainer>
            {icon}
            <ExerciseAreaText>{bodyPart}</ExerciseAreaText>
            </ExerciseHeaderContainer>
            <ExercisesImagesContainer>
              <MuscleGroupList
                selectedExercise={selectedExercise}
                setSelectedExercise={(key: any) => {
                  setSelectedExercise(key)
                  handleSpecificExercise(key, bodyPart)
                  setModalOpen(true)
                }}
                list={exerciseList}
              />
             </ExercisesImagesContainer>
          </ExerciseAreaContainer>
        )
      })}

    </Container>
  )
}

export default AvailableExercises