import styled from 'styled-components';
import { DarkGray, LightGray, Rage } from '../../../styles/global';
import { ReactComponent as SaveChanges } from '../../../assets/images/SettingsScreen/save-icon.svg';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: relative;
`;

export const ModalTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.875rem;
`;

export const ModalTextAndButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`;

export const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9.875rem;
  height: 2.1875rem;
  border: 0.0625rem solid #282828;
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-0.0938rem);
  }
  border-radius: 0.625rem;
  cursor: pointer;
`;

export const ConfirmButton = styled(CancelButton)`
  border: 0;
  background: ${Rage};
  box-shadow: 0px 0.0625rem 0.25rem rgba(238, 55, 63, 0.25);
`;

export const CancelButtonText = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${DarkGray};
`;

export const ConfirmButtonText = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${LightGray};
`;

export const ExerciseSelectionText = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  letter-spacing: 0.02em;
  color: ${DarkGray};
`;

export const ConfirmExerciseBoldText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${DarkGray};
  margin-bottom: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const SaveChangesIcon = styled(SaveChanges)`
  align-self: center;
  margin-bottom: 1.25rem;
`;
