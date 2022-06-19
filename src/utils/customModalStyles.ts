import { TransparentBlackShadow } from '../styles/global';

export const customModalStyles = {
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
