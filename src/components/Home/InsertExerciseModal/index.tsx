import React, { useCallback } from 'react';
import Modal from 'react-modal';
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
} from './styles';
import { Dispatch } from 'redux';
import ErrorToast from '../../../toasts/ErrorToast';
import { ReactComponent as CancelModalIcon } from '../../../assets/images/LeftBar/icons/cancel-modal-icon.svg';
import { addExercise } from '../../../store/training/actionCreators';
import { useDispatch, connect, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getCurrentSet } from '../../../store/training/selectors';
import { Rage } from '../../../styles/global';
import { customModalStyles } from '../../../utils/customModalStyles';

interface ModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  specificExercise: Exercise;
}

const InsertExerciseModal = ({ specificExercise, modalOpen, closeModal }: ModalProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const currentSet = useSelector(getCurrentSet);

  const handleAddExerciseToSet = useCallback(() => {
    const addExercisePromise = (dispatch: any) =>
      new Promise((resolve: any, reject) => {
        try {
          dispatch(addExercise(specificExercise, currentSet));
          resolve();
        } catch (error) {
          toast(
            ErrorToast({
              message: 'You have reached the maximum number of exercises allowed on the set'
            })
          );
        }
      });
    addExercisePromise(dispatch);

    closeModal();
  }, [closeModal, dispatch, specificExercise, currentSet]);

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel="Exercise Modal">
      <ModalContainer>
        <ModalTopContainer>
          <ExerciseSelectionText>Exercise Selection</ExerciseSelectionText>
          <CancelModalIcon style={{ cursor: 'pointer' }} onClick={closeModal} />
        </ModalTopContainer>
        <ModalContentContainer>
          <ModalExerciseImage src={specificExercise.image} alt={specificExercise.name} />
          <ModalTextAndButtonsContainer>
            <ExerciseDescriptionText>
              Exercise: <span style={{ color: Rage }}>{specificExercise.name.toUpperCase()}</span>
            </ExerciseDescriptionText>
            <ConfirmExerciseBoldText>
              Confirm adding this exercise to your workout
            </ConfirmExerciseBoldText>
            <ButtonContainer>
              <CancelButton onClick={closeModal}>
                <CancelButtonText>Cancel</CancelButtonText>
              </CancelButton>
              <ConfirmButton onClick={() => handleAddExerciseToSet()}>
                <ConfirmButtonText>Add Exercise</ConfirmButtonText>
              </ConfirmButton>
            </ButtonContainer>
          </ModalTextAndButtonsContainer>
        </ModalContentContainer>
      </ModalContainer>
    </Modal>
  );
};

export default connect(null, { addExercise })(InsertExerciseModal);
