import Modal from 'react-modal'
import { RouteHandler } from 'miragejs/server'
import runServer from '../../server'
import MuscleGroupList from '../HorizontalScrollingImages'
import React, { useCallback, useEffect, useState } from 'react'
import { ReactComponent as ChestIcon } from '../../assets/images/LeftBar/icons/chest_icon.svg'
import { ReactComponent as LegIcon } from '../../assets/images/LeftBar/icons/legs_icon.svg'
import { Container, ExerciseAreaText, ExerciseAreaContainer, ExercisesImagesContainer } from './styles'

interface ExercisesProps {
  legs: Exercise[] | [] | object[];
  chest: Exercise[] | [] | object[];
}

export interface Exercise {
  id: number;
  name: string;
  image: string;
  restTime?: string;
  afflictedBodyPart: string
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AvailableExercises = () => {
  runServer()
  const [selectedExercise, setSelectedExercise] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chestExercises, setChestExercises] = useState<Exercise[] | []>([])
  const [legsExercises, setLegsExercises] = useState<Exercise[] | []>([])
  const [specificExercise, setSpecificExercise] = useState<Exercise>({
    id: 0,
    name: '',
    afflictedBodyPart: '',
    image: '', 
    restTime: ''
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
      .then((json) => {
        console.log(json)
      })
  }, [])

  return (
    <Container>
      <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Exercise Selection</h2>
        <button onClick={() => setModalOpen(false)}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
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
            console.log(key)
            setSelectedExercise(key)
          }}
          list={legsExercises}
        />
      </ExercisesImagesContainer>

    </Container>
  )
}

export default AvailableExercises