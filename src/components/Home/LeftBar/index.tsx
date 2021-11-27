import React, { Dispatch, SetStateAction, useState } from 'react'
import { CollapsedArrowContainer, CollapsedArrowLeft, CollapsedArrowRight, CollapsedContainer, Container, Header, HeaderWorkout, IconsContainer, WorkoutContainer } from './styles'
import { ReactComponent as Branding } from '../../../assets/images/LeftBar/branding.svg'
import AvailableExercises from '../AvailableExercises'
import { Collapse } from 'react-collapse';
import Search from '../Search'
import { Animate } from "react-show";

interface LeftBarProps {
  isWorkout?: boolean;
}

interface SearchProps {
  setExerciseSearch?: Dispatch<SetStateAction<string>>,
  searchExercise?: string
}

const content = {
  Home: ({ setExerciseSearch, searchExercise}: SearchProps) => LeftBarHome({setExerciseSearch, searchExercise}),
  Workout: () => LeftBarWorkout()
}

const LeftBarHome = ({setExerciseSearch, searchExercise}: SearchProps) => (
  <Container>
    <Header>
    <Branding />
    </Header>
    <IconsContainer />
    <Search
      changeExerciseSearch={(value: string) => setExerciseSearch!(value)}
    />
    <AvailableExercises
      searchExercise={searchExercise!}
    />
  </Container>
)

const LeftBarWorkout = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
      isOpen
        ? ( 
            <WorkoutContainer>
              <HeaderWorkout>
                <Branding />
              </HeaderWorkout>
              <CollapsedArrowContainer onClick={() => setIsOpen(false)}>
                <CollapsedArrowLeft />
              </CollapsedArrowContainer>
            </WorkoutContainer>
      ) : (
        <CollapsedContainer>
          <CollapsedArrowContainer onClick={() => setIsOpen(true)}>
            <CollapsedArrowRight />
          </CollapsedArrowContainer>
        </CollapsedContainer>
      )
    )
}

const LeftBar = ({ isWorkout }: LeftBarProps) => {
  const [searchExercise, setExerciseSearch] = useState<string>('')

  return isWorkout!
        ? content['Workout']()
        : content['Home']({ setExerciseSearch, searchExercise })
}

export default LeftBar