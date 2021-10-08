import React from 'react'
import { ReactComponent as DeleteIcon } from '../../assets/images/ExerciseCardSet/delete.svg'
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
  name: string;
  image: string;
  restTime: number;
  trainTime: number;
  removeExerseFromSet: () => void;
}

export default function ExerciseSetCard({ 
    name, 
    image, 
    restTime, 
    trainTime, 
    removeExerseFromSet
}: ExerciseSetCardProps) {
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
              onClick={removeExerseFromSet}
              width={20}
              height={20}
            />
          </TextAndDeleteContainer>
          <TrainRestContainer>
            <TrainContainer>
              <HeaderTrainRest>TRAIN</HeaderTrainRest>
              <InputContainer>
                <InputSurroundings>
                  <TimeInput value={trainTime} />
                </InputSurroundings>
                <SecondsText>seg</SecondsText>
              </InputContainer>
            </TrainContainer>
            <RestContainer>
              <HeaderTrainRest>REST</HeaderTrainRest>
              <InputContainer>
                <InputSurroundings>
                  <TimeInput value={restTime}></TimeInput>
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