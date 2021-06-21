import React from 'react'
import Modal from 'react-modal'
import {
  ModalContainer,
  ModalTopContainer,
  ModalExerciseImage,
  ModalTextAndButtonsContainer,
  ModalContentContainer,
  ButtonContainer,
  CancelButton,
  CancelButtonText,
  ConfirmButton,
  ConfirmButtonText,
  ConfirmExerciseBoldText,
  ExerciseDescriptionText,
  ExerciseSelectionText
} from './styles'
import { ReactComponent as CancelModalIcon } from '../../assets/images/LeftBar/icons/cancel-modal-icon.svg'
import { Exercise } from '../AvailableExercises';

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

interface ModalProps {
  specificExercise: Exercise;
  modalOpen: boolean;
  closeModal: () => void;
  hoverCancel: () => void;
  unhoverCancel: () => void;
  hoverConfirm: () => void;
  unhoverConfirm: () => void;
  cancelButtonActive: boolean;
  confirmButtonActive: boolean
}


const InsertExerciseModal = ({
  specificExercise,
  modalOpen,
  closeModal,
  hoverCancel,
  unhoverCancel,
  hoverConfirm,
  unhoverConfirm,
  cancelButtonActive,
  confirmButtonActive
}: ModalProps) => {
  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Exercise Modal"
    >
      <ModalContainer>
        <ModalTopContainer>
          <ExerciseSelectionText>Exercise Selection</ExerciseSelectionText>
          <CancelModalIcon
            style={{ cursor: 'pointer' }}
            onClick={closeModal}
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
                onMouseEnter={hoverCancel}
                onMouseLeave={unhoverCancel}
                isHovered={cancelButtonActive}
                onClick={closeModal}
              >
                <CancelButtonText>Cancel</CancelButtonText>
              </CancelButton>
              <ConfirmButton
                onMouseEnter={hoverConfirm}
                onMouseLeave={unhoverConfirm}
                isHovered={confirmButtonActive}
              >
                <ConfirmButtonText>Add Exercise</ConfirmButtonText>
              </ConfirmButton>
            </ButtonContainer>
          </ModalTextAndButtonsContainer>
        </ModalContentContainer>
      </ModalContainer>
    </Modal>
  )
}

export default InsertExerciseModal