import React, { Dispatch, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as DeleteIcon } from '../../assets/images/ExerciseCardSet/delete.svg'
import { removeExercise, updateExerciseRestTime, updateExerciseTrainTime } from '../../store/actionCreators';
import { getCurrentSet } from '../../store/selectors';
import {
  Container,
  InputContainer,
  ContentsContainer, ExerciseNameTrainRestContainer,
  HeaderText,
  HeaderTrainRest,
  InputSurroundings,
  RestContainer,
  SecondsText,
  TextAndDeleteContainer,
  TimeInput,
  TrainRestContainer,
  TrainContainer
} from './styles'

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
    trainTime, 
}: ExerciseSetCardProps) {
  const dispatch: Dispatch<any> = useDispatch();
  const [restTimeInput, setRestTimeInput] = useState(restTime);
  const [trainTimeInput, setTrainTimeInput] = useState(trainTime);
  
  return (
    <Container>
      <ContentsContainer>
        <img
          style={{
            width: '95px',
            height: '80px',
            borderRadius: '10px',
            marginRight: '24px'
          }}
          src={image}
          alt='sample-exercise-img'
        />
        <ExerciseNameTrainRestContainer>
          <TextAndDeleteContainer>
            <HeaderText>{name}</HeaderText>
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(removeExercise(index, set))}
              width={20}
              height={20}
            />
          </TextAndDeleteContainer>
          <TrainRestContainer>
            <TrainContainer>
              <HeaderTrainRest>TRAIN</HeaderTrainRest>
              <InputContainer>
                <InputSurroundings>
                  <TimeInput
                    maxLength={3}
                    pattern="[0-9]{3}"
                    value={trainTimeInput}
                    onChange={(event) => {
                      const updatedValue = Number(event.target.value)
                      setTrainTimeInput(updatedValue);
                      dispatch(updateExerciseTrainTime(index, set, updatedValue));
                    }}
                  />
                </InputSurroundings>
                <SecondsText>seg</SecondsText>
              </InputContainer>
            </TrainContainer>
            <RestContainer>
              <HeaderTrainRest>REST</HeaderTrainRest>
              <InputContainer>
                <InputSurroundings>
                  <TimeInput
                    maxLength={3}
                    pattern="[0-9]{3}"
                    value={restTimeInput}
                    onChange={(event) => {
                      const updatedValue = Number(event.target.value)
                      setRestTimeInput(updatedValue);
                      dispatch(updateExerciseRestTime(index, set, updatedValue))
                    }}
                  />
                </InputSurroundings>
                <SecondsText>seg</SecondsText>
              </InputContainer>
            </RestContainer>
          </TrainRestContainer>
        </ExerciseNameTrainRestContainer>
      </ContentsContainer>
    </Container>
  )
}