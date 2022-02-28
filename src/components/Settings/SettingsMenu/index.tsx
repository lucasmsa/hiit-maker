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
import { getSetRestTime, getTrainingDefaultValues } from '../../../store/selectors';
import TimeInput from '../../Home/TimeInput';

const SettingsMenu = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const trainingDefaultValues = useSelector(getTrainingDefaultValues, shallowEqual);
  type PossibleConfigurations =
    | 'exerciseRestTime'
    | 'exerciseTrainTime'
    | 'finalRestTime'
    | 'setRepetitions';
  const [newTrainingDefaultValues, setNewTrainingDefaultValues] = useState({
    exerciseRestTime: trainingDefaultValues.exerciseRestTime,
    exerciseTrainTime: trainingDefaultValues.exerciseTrainTime,
    finalRestTime: trainingDefaultValues.finalRestTime,
    setRepetitions: trainingDefaultValues.setRepetitions
  });

  const configurationValues = {
    'EXERCISE REST': 'exerciseRestTime',
    'EXERCISE TRAIN': 'exerciseTrainTime',
    'FINAL REST': 'finalRestTime',
    'SET REPETITIONS': 'setRepetitions'
  } as { [key in string]: PossibleConfigurations };

  const configurationBoundaries = {
    exerciseRestTime: { min: 0, max: 999 },
    exerciseTrainTime: { min: 5, max: 999 },
    finalRestTime: { min: 0, max: 999 },
    setRepetitions: { min: 1, max: 5 }
  } as { [key in PossibleConfigurations]: { min: number; max: number } };

  const handleBoundaries = (value: string, label: PossibleConfigurations) => {
    const { min, max } = configurationBoundaries[label];
    let newValue = value !== '' ? Number(value) : min;
    newValue < min && (newValue = min);
    newValue > max && (newValue = max);

    return newValue;
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
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            const newValue = handleBoundaries(value, configurationValues[highlightedText]);
            return setNewTrainingDefaultValues((oldState) => ({
              ...oldState,
              [configurationValues[highlightedText]]: newValue
            }));
          }}
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
        {Object.entries(configurationValues).map(
          (configuration: Pair<string, PossibleConfigurations>) => {
            const [highlightedText, labelName] = configuration;
            return settingsConfigurationsOption(
              highlightedText,
              newTrainingDefaultValues[labelName]
            );
          }
        )}
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
