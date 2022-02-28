import React, { ChangeEvent, useCallback, useState } from 'react';
import { Dispatch } from 'redux';
import {
  Container,
  SettingsHeaderContainer,
  SettingsHeaderText,
  FooterContainer,
  SettingsHeaderIcon,
  SettingsContentContainer,
  SettingsConfigurationOptionContainer,
  SettingsConfigurationOptionText,
  SettingsConfigurationOptionHighlightText,
  SaveChangesText,
  SaveChangesContainer,
  RestoreSettingsText
} from './styles';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  getCurrentSet,
  getSetRestTime,
  getTrainingDefaultValues,
  getTrainingSetExercises,
  getTrainingSetLoopQuantity
} from '../../../store/selectors';
import { updateCurrentSetLoopQuantity } from '../../../store/actionCreators';
import toast from 'react-hot-toast';
import ErrorToast from '../../../toasts/ErrorToast';
import TimeInput from '../../Home/TimeInput';

const SettingsMenu = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const setRestTime = useSelector(getSetRestTime);
  const trainingDefaultValues = useSelector(getTrainingDefaultValues, shallowEqual);
  const currentSetLoopQuantity = useSelector(getTrainingSetLoopQuantity);
  const currentSetExercises = useSelector(getTrainingSetExercises, shallowEqual);
  const [setRestTimeInput, setSetRestTimeInput] = useState(setRestTime);

  // type PossibleConfigurations =
  //   | 'EXERCISE REST'
  //   | 'EXERCISE TRAIN'
  //   | 'FINAL REST'
  //   | 'SET REPETITIONS';

  const configurationValues = {
    'EXERCISE REST': trainingDefaultValues.exerciseRestTime,
    'EXERCISE TRAIN': trainingDefaultValues.exerciseTrainTime,
    'FINAL REST': trainingDefaultValues.finalRestTime,
    'SET REPETITIONS': trainingDefaultValues.setRepetitions
  };

  const settingsConfigurationsOption = useCallback(
    (highlightedText: string, value: number) => (
      <SettingsConfigurationOptionContainer>
        <SettingsConfigurationOptionText>
          DEFAULT{' '}
          <SettingsConfigurationOptionHighlightText>
            {highlightedText}
          </SettingsConfigurationOptionHighlightText>{' '}
          TIME
        </SettingsConfigurationOptionText>
        <TimeInput
          label={highlightedText === 'SET REPETITIONS' ? 'SET_RELATED' : 'EXERCISE_RELATED'}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {}}
        />
      </SettingsConfigurationOptionContainer>
    ),
    []
  );

  return (
    <Container>
      <SettingsHeaderContainer>
        <SettingsHeaderIcon />
        <SettingsHeaderText>Settings</SettingsHeaderText>
      </SettingsHeaderContainer>
      <SettingsContentContainer>
        {Object.entries(configurationValues).map((configuration: Pair<string, number>) => {
          const [highlightedText, value] = configuration;
          return settingsConfigurationsOption(highlightedText, value);
        })}
      </SettingsContentContainer>
      <FooterContainer>
        <RestoreSettingsText>RESTORE SETTINGS</RestoreSettingsText>
        <SaveChangesContainer>
          <SaveChangesText>SAVE CHANGES</SaveChangesText>
        </SaveChangesContainer>
      </FooterContainer>
    </Container>
  );
};

export default connect()(SettingsMenu);
