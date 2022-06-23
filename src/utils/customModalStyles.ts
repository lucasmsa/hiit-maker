import { TransparentBlackShadow } from '../styles/global';

export const customModalStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: '100',
    backdropFilter: 'blur(0.0313rem)'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'null',
    overflow: 'hidden',
    background: 'null'
  }
};
