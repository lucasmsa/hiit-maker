import React from 'react'
import { HeaderLeftText, Container, Header, IconsContainer } from './styles'
import { ReactComponent as Dumbell } from '../../assets/images/LeftBar/dumbbells.svg'
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
        {/* <Dumbell src="/images/LeftBar/icons/github_icon.svg" />
        <Dumbell src="/images/LeftBar/icons/info_icon.svg" /> */}
      </IconsContainer>
      <Search />
      <AvailableExercises />
    </Container>
  )
}

export default LeftBar