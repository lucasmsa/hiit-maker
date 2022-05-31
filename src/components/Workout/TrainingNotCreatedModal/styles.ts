import styled from 'styled-components';
import { DarkGray, LightGray, Rage } from '../../../styles/global';
import { ReactComponent as SaveChanges } from '../../../assets/images/SettingsScreen/save-icon.svg';
import { ReactComponent as WorkoutNotFound } from '../../../assets/images/WorkoutScreen/training-not-created.svg';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: relative;
`;

export const ModalTopContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
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
  width: 31.5625rem;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13.75rem;
  height: 2.1875rem;
  border: 0.0625rem solid #282828;
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-0.0938rem);
  }
  border-radius: 0.625rem;
  cursor: pointer;
`;

export const BackToHomeButton = styled(Button)`
  border: 0;
  background: ${Rage};
  box-shadow: 0px 0.0625rem 0.25rem rgba(238, 55, 63, 0.25);
`;

export const BackToHomeButtonText = styled.h4`
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

export const BackToHomeBoldText = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.02em;
  color: ${DarkGray};
  margin-bottom: 2rem;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const WorkoutNotFoundIcon = styled(WorkoutNotFound)`
  align-self: center;
  margin-bottom: 1.25rem;
`;

export const WorkoutNotFoundIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Rage};
  border-radius: 0.625rem;
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 50%;
  align-self: center;
  margin-bottom: 1.5rem;
`;
