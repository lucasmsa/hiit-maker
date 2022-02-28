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
import { getTrainingDefaultValues } from '../../../store/selectors';
import TimeInput from '../../Home/TimeInput';
import { INITIAL_DEFAULT_VALUES } from '../../../config/contants';
import { PossibleConfigurations } from '../../../utils/settings/possibleConfigurations';
import { handleBoundaries } from '../../../utils/settings/handleBoundaries';
import ConfirmChangesModal from '../ConfirmChangesModal';

const SettingsMenu = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const trainingDefaultValues = useSelector(getTrainingDefaultValues, shallowEqual);
  const [changesWereMade, setChangesWereMade] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    exerciseTrainTime: { min: 0, max: 999 },
    finalRestTime: { min: 0, max: 999 },
    setRepetitions: { min: 1, max: 5 }
  } as { [key in PossibleConfigurations]: { min: number; max: number } };

  const containsEqualDefaultValues = (element: Pair<string, number>) => {
    const [key, value] = element;
    return value !== INITIAL_DEFAULT_VALUES[key as PossibleConfigurations];
  };

  const handleRestoreDefaultSettings = useCallback(() => {
    if (!changesWereMade) {
      Object.entries(newTrainingDefaultValues).some(containsEqualDefaultValues) &&
        setChangesWereMade(true);
    }

    setNewTrainingDefaultValues((oldState) => ({
      ...oldState,
      exerciseRestTime: INITIAL_DEFAULT_VALUES.exerciseRestTime,
      exerciseTrainTime: INITIAL_DEFAULT_VALUES.exerciseTrainTime,
      finalRestTime: INITIAL_DEFAULT_VALUES.finalRestTime,
      setRepetitions: INITIAL_DEFAULT_VALUES.setRepetitions
    }));
    console.log(newTrainingDefaultValues);
  }, []);

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
            !changesWereMade && setChangesWereMade(true);
            const { value } = event.target;
            const newValue = handleBoundaries(
              value,
              configurationValues[highlightedText],
              configurationBoundaries
            );
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
      <ConfirmChangesModal
        newDefaultValues={newTrainingDefaultValues}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      />
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
        <RestoreSettingsText onClick={handleRestoreDefaultSettings}>
          RESTORE SETTINGS
        </RestoreSettingsText>
        <SaveChangesContainer
          onClick={() => {
            changesWereMade && setModalOpen(true);
          }}>
          <SaveChangesText activated={changesWereMade}>SAVE CHANGES</SaveChangesText>
        </SaveChangesContainer>
      </FooterContainer>
    </Container>
  );
};

export default connect()(SettingsMenu);
