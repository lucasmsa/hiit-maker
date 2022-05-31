import React from 'react';
import Modal from 'react-modal';
import {
  ModalContainer,
  ModalTopContainer,
  ModalTextAndButtonsContainer,
  ModalContentContainer,
  ButtonContainer,
  BackToHomeButton,
  BackToHomeButtonText,
  BackToHomeBoldText,
  ExerciseSelectionText,
  WorkoutNotFoundIcon,
  WorkoutNotFoundIconContainer
} from './styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { customModalStyles } from '../../../utils/customModalStyles';

interface ModalProps {
  modalOpen: boolean;
}

const TrainingNotCreatedModal = ({ modalOpen }: ModalProps) => {
  return (
    <Modal
      isOpen={modalOpen}
      style={customModalStyles}
      contentLabel="Exercise Modal">
      <ModalContainer>
        <ModalTopContainer>
          <ExerciseSelectionText>Training not created</ExerciseSelectionText>
        </ModalTopContainer>
        <ModalContentContainer>
          <ModalTextAndButtonsContainer>
            <WorkoutNotFoundIconContainer>
              <WorkoutNotFoundIcon />
            </WorkoutNotFoundIconContainer>
            <BackToHomeBoldText>
              You are trying to start a workout that was not created yet, go back to the home screen, create your workout and start it!
            </BackToHomeBoldText>
            <ButtonContainer>
              <Link style={{ textDecoration: 'none' }} to={'/'}>
                <BackToHomeButton onClick={() => {}}>
                  <BackToHomeButtonText>BACK TO HOME SCREEN</BackToHomeButtonText>
                </BackToHomeButton>
              </Link>
            </ButtonContainer>
          </ModalTextAndButtonsContainer>
        </ModalContentContainer>
      </ModalContainer>
    </Modal>
  );
};

export default connect()(TrainingNotCreatedModal);