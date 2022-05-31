import React, { SetStateAction, useCallback } from 'react';
import Modal from 'react-modal';
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
  SaveChangesIcon
} from './styles';
import { Dispatch } from 'redux';
import ErrorToast from '../../../toasts/ErrorToast';
import { ReactComponent as CancelModalIcon } from '../../../assets/images/LeftBar/icons/cancel-modal-icon.svg';
import { updateDefaultTrainingValues } from '../../../store/training/actionCreators';
import { useDispatch, connect } from 'react-redux';
import { toast } from 'react-hot-toast';
import { PossibleConfigurations } from '../../../utils/settings/possibleConfigurations';
import { customModalStyles } from '../../../utils/customModalStyles';

interface ModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  newChangesWereMade: () => void;
  setLastTrainingDefaultValues: (newDefaultValues: {
    [key in PossibleConfigurations]: number;
  }) => void;
  newDefaultValues: { [key in PossibleConfigurations]: number };
}

const ConfirmChangesModal = ({
  modalOpen,
  closeModal,
  newDefaultValues,
  newChangesWereMade,
  setLastTrainingDefaultValues
}: ModalProps) => {
  const dispatch: Dispatch<any> = useDispatch();

  const handleChangeDefaultValues = useCallback(() => {
    const updateDefaultValuesPromise = (dispatch: any) =>
      new Promise((resolve: any, reject) => {
        try {
          dispatch(updateDefaultTrainingValues(newDefaultValues));
          resolve();
        } catch (error) {
          toast(
            ErrorToast({
              message: 'Something went wrong while updating default values.'
            })
          );
        }
      });

    updateDefaultValuesPromise(dispatch);

    newChangesWereMade();
    setLastTrainingDefaultValues(newDefaultValues);

    closeModal();
  }, [closeModal, dispatch, newDefaultValues]);

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel="Exercise Modal">
      <ModalContainer>
        <ModalTopContainer>
          <ExerciseSelectionText>Confirm changes?</ExerciseSelectionText>
          <CancelModalIcon style={{ cursor: 'pointer' }} onClick={closeModal} />
        </ModalTopContainer>
        <ModalContentContainer>
          <ModalTextAndButtonsContainer>
            <SaveChangesIcon />
            <ConfirmExerciseBoldText>
              Confirm adding new default values for your exercise training times
            </ConfirmExerciseBoldText>
            <ButtonContainer>
              <CancelButton onClick={closeModal}>
                <CancelButtonText>Cancel</CancelButtonText>
              </CancelButton>
              <ConfirmButton onClick={() => handleChangeDefaultValues()}>
                <ConfirmButtonText>Confirm</ConfirmButtonText>
              </ConfirmButton>
            </ButtonContainer>
          </ModalTextAndButtonsContainer>
        </ModalContentContainer>
      </ModalContainer>
    </Modal>
  );
};

export default connect()(ConfirmChangesModal);
