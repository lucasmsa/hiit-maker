import React, { useCallback } from 'react';
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
import { updateDefaultTrainingValues } from '../../../store/actionCreators';
import { useDispatch, connect, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getCurrentSet } from '../../../store/selectors';
import { TransparentBlackShadow } from '../../../styles/global';
import { PossibleConfigurations } from '../../../utils/settings/possibleConfigurations';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 20,
    boxShadow: `0px 1px 4px ${TransparentBlackShadow}`
  }
};

interface ModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  newDefaultValues: { [key in PossibleConfigurations]: number };
}

const ConfirmChangesModal = ({ modalOpen, closeModal, newDefaultValues }: ModalProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const currentSet = useSelector(getCurrentSet);

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

    closeModal();
  }, [closeModal, dispatch, currentSet]);

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
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
