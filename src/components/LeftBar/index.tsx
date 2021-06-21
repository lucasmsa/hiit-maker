import React from 'react'
import { Container, Header, IconsContainer } from './styles'
import { ReactComponent as Branding } from '../../assets/images/LeftBar/branding.svg'
import AvailableExercises from '../AvailableExercises'
import Search from '../Search'

const LeftBar = () => {
  return (
    <Container>
      <Header>
        <Branding />
      </Header>
      <IconsContainer>
      </IconsContainer>
      <Search />
      <AvailableExercises />
    </Container>
  )
}

export default LeftBar