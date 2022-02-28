import React, { Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as DeleteIcon } from '../../../assets/images/ExerciseCardSet/delete.svg';
import {
  removeExercise,
  removeSet,
  updateCurrentSet,
  updateExerciseRestTime,
  updateExerciseTrainTime
} from '../../../store/actionCreators';
import { getTrainingSetExercises, getTrainSetLoops } from '../../../store/selectors';
import isNumeric from '../../../utils/isNumeric';
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
                onChange={(event: any) => {
                  if (isNumeric(event.target.value)) {
                    const updatedValue = Number(event.target.value);
                    setTrainTimeInput(updatedValue);
                    dispatch(updateExerciseTrainTime(index, set, updatedValue));
                  } else if (event.target.value === '' || event.target.value < 6) {
                    setTrainTimeInput(5);
                    dispatch(updateExerciseTrainTime(index, set, 5));
                  }
                }}
              />
            </TrainContainer>
            <RestContainer>
              <HeaderTrainRest>REST</HeaderTrainRest>
              <TimeInput
                value={restTimeInput}
                onChange={(event: any) => {
                  if (isNumeric(event.target.value)) {
                    const updatedValue = Number(event.target.value);
                    setRestTimeInput(updatedValue);
                    dispatch(updateExerciseRestTime(index, set, updatedValue));
                  } else if (event.target.value === '') {
                    setRestTimeInput(0);
                    dispatch(updateExerciseRestTime(index, set, 0));
                  }
                }}
              />
            </RestContainer>
          </TrainRestContainer>
        </ExerciseNameTrainRestContainer>
      </ContentsContainer>
    </Container>
  );
}
