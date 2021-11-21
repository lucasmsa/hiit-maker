import React from 'react'
import {
  Container,
  AddSetText,
  RemoveSetText,
  SetsContainer,
  HeaderTextStyle, 
  AddSetContainer,
  WorkoutContainer,
  RemoveSetContainer,
  ExercisesContainer, 
  CurrentTrainingSetsContainer,
  SetsLimitText,
  SetsLimitCountText,
} from './styles'
import { ReactComponent as AddSetIcon } from '../../../assets/images/midSection/addSet.svg'
import { ReactComponent as SelectedSetIcon } from '../../../assets/images/midSection/selected-set.svg'
import { ReactComponent as NotSelectedSetIcon } from '../../../assets/images/midSection/not-selected-set.svg'
import { ReactComponent as ConnectingLine } from '../../../assets/images/midSection/connecting-line.svg'
import {ReactComponent as RemoveSetIcon} from '../../../assets/images/midSection/removeSet.svg'
import MountWorkout from '../MountWorkout'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { addSet, removeSet, updateCurrentSet } from '../../../store/actionCreators'
import { getCurrentSet, getTrainSetLoops } from '../../../store/selectors'

export default function MidSection() {
  const dispatch: Dispatch<any> = useDispatch();

  const trainingSets = useSelector(getTrainSetLoops);
  const currentSet = useSelector(getCurrentSet);
  const setsQuantity = trainingSets.length;

  return (
    <Container>
      <HeaderTextStyle>Create your workout with a few steps</HeaderTextStyle>
      <ExercisesContainer>
        <SetsContainer>
          <SetsLimitText>Set Limit: <SetsLimitCountText>{setsQuantity}</SetsLimitCountText>/5</SetsLimitText>
          <CurrentTrainingSetsContainer>
            {
                trainingSets.map((set, index) => { 
                  const setIcon = currentSet === index
                                  ? <SelectedSetIcon style={{ cursor: 'pointer' }} />
                                  : <NotSelectedSetIcon 
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => dispatch(updateCurrentSet(index))}
                                    />
                  if (index === 0) {
                    return (
                      setIcon
                    )
                  } else {
                    return (
                      <>
                        <ConnectingLine />
                        {setIcon}
                      </>
                    )
                  }
                }
              )
            }
            </CurrentTrainingSetsContainer>
            {
              trainingSets.length <= 4 && 
              <AddSetContainer
                  onClick={() => {
                    dispatch(addSet(currentSet))
                    dispatch(updateCurrentSet(setsQuantity))
                }}>
                <AddSetIcon />
                <AddSetText>Add set</AddSetText>
              </AddSetContainer>
            }
            {
              trainingSets.length > 1 &&
              <RemoveSetContainer onClick={() => {
                  dispatch(removeSet(currentSet))
                }}>
                <RemoveSetIcon />
                <RemoveSetText>Remove set</RemoveSetText>
              </RemoveSetContainer>
            }
      </SetsContainer>
        <WorkoutContainer>
          <MountWorkout />
        </WorkoutContainer>
      </ExercisesContainer>
  </Container>
  )
}