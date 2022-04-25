import React, { ChangeEvent, Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as DeleteIcon } from '../../../assets/images/ExerciseCardSet/delete.svg';
import {
  removeExercise,
  removeSet,
  updateCurrentSet,
  updateExerciseRestTime,
  updateExerciseTrainTime
} from '../../../store/training/actionCreators';
import { getTrainingSetExercises, getTrainSetLoops } from '../../../store/training/selectors';
import { configurationBoundaries } from '../../../utils/settings/configurationBoundaries';
import TimeInput from '../TimeInput';
import {
  Container,
  ContentsContainer,
  ExerciseNameTrainRestContainer,
  HeaderText,
  HeaderTrainRest,
  RestContainer,
  TextAndDeleteContainer,
  TrainRestContainer,
  TrainContainer
} from './styles';

interface ExerciseSetCardProps {
  set: number;
  name: string;
  index: number;
  image: string;
  restTime: number;
  trainTime: number;
}

export default function ExerciseSetCard({
  name,
  index,
  set,
  image,
  restTime,
  trainTime
}: ExerciseSetCardProps) {
  const dispatch: Dispatch<any> = useDispatch();
  const [restTimeInput, setRestTimeInput] = useState(restTime);
  const [trainTimeInput, setTrainTimeInput] = useState(trainTime);
  const trainSetLoops = useSelector(getTrainSetLoops);
  const currentTrainingSetExercises = useSelector(getTrainingSetExercises);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, type: 'TRAIN' | 'REST') => {
    const { value } = event.target;
    if (isNaN(+value)) return;
    return type === 'TRAIN' ? setTrainTimeInput(value as any) : setRestTimeInput(value as any);
  };

  const handleInputFocusOut = (event: any, type: 'TRAIN' | 'REST') => {
    const { value } = event.target;
    const eventFunctionalities = {
      TRAIN: {
        min: configurationBoundaries.exerciseTrainTime.min,
        set: (value: number) => setTrainTimeInput(value),
        dispatch: (value: number) => dispatch(updateExerciseTrainTime(index, set, value))
      },
      REST: {
        min: configurationBoundaries.exerciseRestTime.min,
        set: (value: number) => setRestTimeInput(value),
        dispatch: (value: number) => dispatch(updateExerciseRestTime(index, set, value))
      }
    };
    if (value === '' || Number(value) < eventFunctionalities[type].min) {
      eventFunctionalities[type].set(eventFunctionalities[type].min);
      eventFunctionalities[type].dispatch(eventFunctionalities[type].min);
    } else {
      eventFunctionalities[type].dispatch(Number(value));
    }
  };

  return (
    <Container>
      <ContentsContainer>
        <img
          style={{
            width: '95px',
            height: '70px',
            borderRadius: '10px',
            marginRight: '24px'
          }}
          src={image}
          alt="sample-exercise-img"
        />
        <ExerciseNameTrainRestContainer>
          <TextAndDeleteContainer>
            <HeaderText>{name}</HeaderText>
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(removeExercise(index, set));
                if (currentTrainingSetExercises.length === 1 && trainSetLoops.length > 1) {
                  dispatch(removeSet(set));
                  if (set === 0) {
                    dispatch(updateCurrentSet(set));
                  }
                }
              }}
              width={20}
              height={20}
            />
          </TextAndDeleteContainer>
          <TrainRestContainer>
            <TrainContainer>
              <HeaderTrainRest>TRAIN</HeaderTrainRest>
              <TimeInput
                value={trainTimeInput}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, 'TRAIN')
                }
                onFocusOut={(event: any) => handleInputFocusOut(event, 'TRAIN')}
              />
            </TrainContainer>
            <RestContainer>
              <HeaderTrainRest>REST</HeaderTrainRest>
              <TimeInput
                value={restTimeInput}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, 'REST')
                }
                onFocusOut={(event: any) => handleInputFocusOut(event, 'REST')}
              />
            </RestContainer>
          </TrainRestContainer>
        </ExerciseNameTrainRestContainer>
      </ContentsContainer>
    </Container>
  );
}
