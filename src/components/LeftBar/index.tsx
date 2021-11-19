import React, { useState } from 'react'
import { Container, Header, IconsContainer } from './styles'
import { ReactComponent as Branding } from '../../assets/images/LeftBar/branding.svg'
import AvailableExercises from '../AvailableExercises'
import Search from '../Search'

const LeftBar = () => {
  const [searchExercise, setExerciseSearch] = useState<string>('')
  return (
    <Container>
      <Header>
        <Branding />
      </Header>
      <IconsContainer>
      </IconsContainer>
      <Search
        changeExerciseSearch={(value: string) => setExerciseSearch(value)}
      />
      <AvailableExercises
        searchExercise={searchExercise}
      />
    </Container>
  )
}

export default LeftBar