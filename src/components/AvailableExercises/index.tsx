import Modal from 'react-modal'
import { RouteHandler } from 'miragejs/server'
import runServer from '../../server'
import MuscleGroupList from '../HorizontalScrollingImages'
import React, { useCallback, useEffect, useState } from 'react'
import { ReactComponent as ChestIcon } from '../../assets/images/LeftBar/icons/chest_icon.svg'
import { ReactComponent as LegIcon } from '../../assets/images/LeftBar/icons/legs_icon.svg'
import { ReactComponent as CancelModalIcon } from '../../assets/images/LeftBar/icons/cancel-modal-icon.svg'
import {
  Container,
  ExerciseAreaText, 
  ExerciseAreaContainer, 
  ExercisesImagesContainer,
  ModalContainer,
  ModalTopContainer,
  ModalContentContainer,
  ExerciseSelectionText,
  ModalExerciseImage,
  ConfirmExerciseBoldText,
  ExerciseDescriptionText,
  ModalTextAndButtonsContainer,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  CancelButtonText,
  ConfirmButtonText
} from './styles'

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
    borderRadius: 20,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
  },
};

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
      .then((exerciseInfo) => {
        setSpecificExercise(exerciseInfo)
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
        <ModalContainer>
          <ModalTopContainer>
            <ExerciseSelectionText>Exercise Selection</ExerciseSelectionText>
            <CancelModalIcon
              style={{ cursor: 'pointer' }}
              onClick={() => setModalOpen(false)}
            />
          </ModalTopContainer>
          <ModalContentContainer>
            <ModalExerciseImage
                src={specificExercise.image}
                alt={specificExercise.name}
              />
            <ModalTextAndButtonsContainer>
              <ExerciseDescriptionText>Exercise: <span style={{ color: '#EE373F'}}>{specificExercise.name.toUpperCase()}</span></ExerciseDescriptionText>
              <ConfirmExerciseBoldText>Confirm adding this exercise to your workout</ConfirmExerciseBoldText>
              <ButtonContainer>
                <CancelButton
                  onMouseEnter={() => {setCancelButtonHover(true)}}
                  onMouseLeave={() => {setCancelButtonHover(false)}}
                  isHovered={cancelButtonHover}
                  onClick={() => setModalOpen(false)}
                >
                  <CancelButtonText>Cancel</CancelButtonText>
                </CancelButton>
                <ConfirmButton
                  onMouseEnter={() => {setConfirmButtonHover(true)}}
                  onMouseLeave={() => {setConfirmButtonHover(false)}}
                  isHovered={confirmButtonHover}
                >
                  <ConfirmButtonText>Add Exercise</ConfirmButtonText>
                </ConfirmButton>
              </ButtonContainer>
            </ModalTextAndButtonsContainer>
          </ModalContentContainer>
        </ModalContainer>
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