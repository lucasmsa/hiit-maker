import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentSet } from '../../../store/training/selectors';
import {
  BottomContainer,
  Container,
  DotsContainer,
  ExercisesOnSetContainer,
  ExercisesOnSetText,
  InsideSetContainer,
  ProgressBlock,
  ProgressBlockBottomText,
  ProgressBlockHeaderText,
  ProgressBlockTimesBottom,
  StyledConnectingLine,
  StyledNotSelectedSetIcon,
  StyledSelectedSetIcon,
  TrainingProgressContainer
} from './styles';

const SetsProgress = () => {
  const currentSet = useSelector(getCurrentSet);
  const exercisesMock = [
    { name: 'SQUAT WITHOUT DUMBELLS' },
    { name: 'PUSH UPS' },
    { name: 'CRUNCHES' },
    { name: 'PUSH UPS' },
    { name: 'CRUNCHES' }
  ];

  return (
    <Container>
      <BottomContainer>
        <TrainingProgressContainer>
          <ProgressBlock>
            <ProgressBlockHeaderText>PROGRESS</ProgressBlockHeaderText>
            <ExercisesOnSetContainer>
              {exercisesMock.map((set, index) => {
                const setIcon =
                  currentSet === index ? (
                    <StyledSelectedSetIcon />
                  ) : (
                    <StyledNotSelectedSetIcon onClick={() => {}} />
                  );
                return (
                  <InsideSetContainer>
                    <ExercisesOnSetText style={{ marginTop: index > 0 ? '1.75rem' : 0 }}>
                      {set.name}
                    </ExercisesOnSetText>
                    <DotsContainer>
                      {index !== 0 && <StyledConnectingLine />}
                      {setIcon}
                    </DotsContainer>
                  </InsideSetContainer>
                );
              })}
            </ExercisesOnSetContainer>
            <ProgressBlockTimesBottom>
              <ProgressBlockBottomText>{`${'3'} SET REPETITIONS LEFT`}</ProgressBlockBottomText>
            </ProgressBlockTimesBottom>
          </ProgressBlock>
        </TrainingProgressContainer>
      </BottomContainer>
    </Container>
  );
};

export default SetsProgress;
