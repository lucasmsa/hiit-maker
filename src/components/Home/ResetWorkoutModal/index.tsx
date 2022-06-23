import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { Dispatch } from 'redux';
import { Icon } from '@iconify/react';
import { White } from '../../../styles/global';
import { useDispatch, connect } from 'react-redux';
import { customModalStyles } from '../../../utils/customModalStyles';
import ConfirmModalContainerWrapper from '../../ConfirmModalContainerWrapper';
import ErrorToast from '../../../toasts/ErrorToast';
import { toast } from 'react-hot-toast';
import { resetWorkout } from '../../../store/training/actionCreators';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

interface ResetWorkoutModalProps {
  modalOpen: boolean;
  closeModal: () => void;
}

const ResetWorkoutModal = ({ modalOpen, closeModal }: ResetWorkoutModalProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const customResetIconStyles = { color: White, transform: 'rotate(-90deg)' };

  const handleResetWorkout = useCallback(() => {
    try {
      dispatch(resetWorkout());
    } catch (error) {
      toast(
        ErrorToast({
          message: 'Something went wrong while updating default values.'
        })
      );
    }

    closeModal();
  }, [closeModal, dispatch]);

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel="Reset Workout modal">
      <AnimatePresence>
        <ConfirmModalContainerWrapper
          closeModal={closeModal}
          icon={
            <Icon icon={'codicon:debug-restart'} style={customResetIconStyles} fontSize={'2rem'} />
          }
          confirm={handleResetWorkout}
          title={'Reset workout?'}
          description={'After confirming, your workout will be reset'}
          confirmText={'RESET WORKOUT'}
          cancelText={'CANCEL'}
        />
      </AnimatePresence>
    </Modal>
  );
};

export default connect()(ResetWorkoutModal);
