import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { Dispatch } from 'redux';
import ErrorToast from '../../../toasts/ErrorToast';
import { updateDefaultTrainingValues } from '../../../store/training/actionCreators';
import { useDispatch, connect } from 'react-redux';
import { toast } from 'react-hot-toast';
import { PossibleConfigurations } from '../../../utils/settings/possibleConfigurations';
import { customModalStyles } from '../../../utils/customModalStyles';
import ConfirmModalContainerWrapper from '../../ConfirmModalContainerWrapper';
import { Icon } from '@iconify/react';
import { White } from '../../../styles/global';

interface ConfirmChangesModalProps {
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
}: ConfirmChangesModalProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const saveIconStyle = { color: White };

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
  }, [closeModal, newChangesWereMade, setLastTrainingDefaultValues, dispatch, newDefaultValues]);

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel="Confirm settings changes modal">
      <ConfirmModalContainerWrapper
        closeModal={closeModal}
        icon={<Icon icon={'ant-design:save-filled'} style={saveIconStyle} fontSize={'2rem'} />}
        confirm={() => handleChangeDefaultValues()}
        title={'Confirm changes?'}
        description={'Confirm adding new default values for your exercise training times'}
        confirmText={'SAVE CHANGES'}
        cancelText={'CANCEL'}
      />
    </Modal>
  );
};

export default connect()(ConfirmChangesModal);
