import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  Container,
  SettingsHeaderText,
  SettingsHeaderContainer,
  FooterContainer,
  SettingsHeaderIcon,
  SettingsContentContainer,
  SettingsConfigurationOptionText,
  SettingsConfigurationOptionContainer,
  SaveChangesText,
  SettingsConfigurationOptionHighlightText,
  SaveChangesContainer,
  RestoreSettingsText
} from './styles';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { getTrainingDefaultValues } from '../../../store/training/selectors';
import TimeInput from '../../Home/TimeInput';
import { INITIAL_DEFAULT_VALUES } from '../../../config/contants';
import { PossibleConfigurations } from '../../../utils/settings/possibleConfigurations';
import { handleBoundaries } from '../../../utils/settings/handleBoundaries';
import ConfirmChangesModal from '../ConfirmChangesModal';
import { configurationBoundaries } from '../../../utils/settings/configurationBoundaries';

const SettingsMenu = () => {
  const trainingDefaultValues = useSelector(getTrainingDefaultValues, shallowEqual);
  const [changesWereMade, setChangesWereMade] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [newTrainingDefaultValues, setNewTrainingDefaultValues] = useState({
    warmupTime: trainingDefaultValues.warmupTime,
    exerciseRestTime: trainingDefaultValues.exerciseRestTime,
    exerciseTrainTime: trainingDefaultValues.exerciseTrainTime,
    setRestTime: trainingDefaultValues.setRestTime,
    setRepetitions: trainingDefaultValues.setRepetitions
  });

  const [lastTrainingDefaultValues, setLastTrainingDefaultValues] =
    useState(newTrainingDefaultValues);

  const configurationValues = {
    'WARMUP TIME': 'warmupTime',
    'EXERCISE TRAIN': 'exerciseTrainTime',
    'EXERCISE REST': 'exerciseRestTime',
    'FINAL REST': 'setRestTime',
    'SET REPETITIONS': 'setRepetitions'
  } as { [key in string]: PossibleConfigurations };

  const containsEqualDefaultValues = (element: Pair<string, number>) => {
    const [key, value] = element;
    return value !== INITIAL_DEFAULT_VALUES[key as PossibleConfigurations];
  };

  const handleRestoreDefaultSettings = useCallback(() => {
    Object.entries(lastTrainingDefaultValues).some(containsEqualDefaultValues)
      ? setChangesWereMade(true)
      : setChangesWereMade(false);

    setNewTrainingDefaultValues((oldState) => ({
      ...oldState,
      warmupTime: INITIAL_DEFAULT_VALUES.warmupTime,
      exerciseRestTime: INITIAL_DEFAULT_VALUES.exerciseRestTime,
      exerciseTrainTime: INITIAL_DEFAULT_VALUES.exerciseTrainTime,
      setRestTime: INITIAL_DEFAULT_VALUES.setRestTime,
      setRepetitions: INITIAL_DEFAULT_VALUES.setRepetitions
    }));
  }, [lastTrainingDefaultValues]);

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
          onFocusOut={(event: any) => {
            const { value } = event.target;
            const configurationLabel = configurationValues[highlightedText];

            const newValue = handleBoundaries(value, configurationLabel, configurationBoundaries);

            !changesWereMade &&
              newValue !== newTrainingDefaultValues[configurationLabel] &&
              setChangesWereMade(true);

            return setNewTrainingDefaultValues((oldState) => ({
              ...oldState,
              [configurationValues[highlightedText]]: newValue
            }));
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            const configurationLabel = configurationValues[highlightedText];
            if (isNaN(+value)) return;
            return setNewTrainingDefaultValues((oldState) => ({
              ...oldState,
              [configurationLabel]: value
            }));
          }}
        />
      </SettingsConfigurationOptionContainer>
    ),
    [changesWereMade, configurationValues, newTrainingDefaultValues]
  );

  return (
    <Container>
      <ConfirmChangesModal
        newDefaultValues={newTrainingDefaultValues}
        modalOpen={modalOpen}
        setLastTrainingDefaultValues={(newDefaultValues) =>
          setLastTrainingDefaultValues(newDefaultValues)
        }
        newChangesWereMade={() => setChangesWereMade(false)}
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
          activated={changesWereMade}
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
