import React from 'react';
import { ReactComponent as CancelModalIcon } from '../../assets/images/LeftBar/icons/cancel-modal-icon.svg';
import {
  ModalContainer,
  ModalTopContainer,
  ModalTextAndButtonsContainer,
  ModalContentContainer,
  ButtonContainer,
  CancelButton,
  CancelButtonText,
  ConfirmButton,
  ConfirmButtonText,
  ConfirmExerciseBoldText,
  ExerciseSelectionText,
  IconCircleContainer
} from './styles';

interface IConfirmModalContainerWrapper {
  closeModal: () => void;
  confirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  icon: any;
}

const ConfirmModalContainerWrapper = ({
  closeModal,
  confirm,
  title,
  icon,
  description,
  confirmText,
  cancelText
}: IConfirmModalContainerWrapper) => {
  return (
    <ModalContainer>
      <ModalTopContainer>
        <ExerciseSelectionText>{title}</ExerciseSelectionText>
        <CancelModalIcon style={{ cursor: 'pointer' }} onClick={closeModal} />
      </ModalTopContainer>
      <ModalContentContainer>
        <ModalTextAndButtonsContainer>
          <IconCircleContainer>{icon}</IconCircleContainer>
          <ConfirmExerciseBoldText>{description}</ConfirmExerciseBoldText>
          <ButtonContainer>
            <CancelButton onClick={closeModal}>
              <CancelButtonText>{cancelText}</CancelButtonText>
            </CancelButton>
            <ConfirmButton onClick={confirm}>
              <ConfirmButtonText>{confirmText}</ConfirmButtonText>
            </ConfirmButton>
          </ButtonContainer>
        </ModalTextAndButtonsContainer>
      </ModalContentContainer>
    </ModalContainer>
  );
};

export default ConfirmModalContainerWrapper;
