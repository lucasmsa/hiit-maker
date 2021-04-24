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
}

export default function ExerciseSetCard({ name, image }: ExerciseSetCardProps) {
  return (
    <Container>
      <ContentsContainer>
        <img
          style={{
            width: '100px',
            height: '92px',
            borderRadius: '10px',
            marginRight: '24px'
          }}
          src={image}
          alt='sample-exercise-img'
        />
        <ExerciseNameTrainRestContainer>
          <TextAndDeleteContainer>
            <HeaderText>{name}</HeaderText>
            <DeleteIcon width={20} height={20} />
          </TextAndDeleteContainer>
          <TrainRestContainer>
            <TrainContainer>
              <HeaderTrainRest>TRAIN</HeaderTrainRest>
              <InputContainer>
                <InputSurroundings>
                  <TimeInput value='60' />
                </InputSurroundings>
                <SecondsText>seg</SecondsText>
              </InputContainer>
            </TrainContainer>
            <RestContainer>
              <HeaderTrainRest>REST</HeaderTrainRest>
              <InputContainer>
                <InputSurroundings>
                  <TimeInput value='30'></TimeInput>
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