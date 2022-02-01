import React from 'react'
import LeftBar from '../../components/Home/LeftBar'
import SettingsMenu from '../../components/Settings/SettingsMenu'
import { Container } from './styles'

const Settings = () => {
  return (
    <Container>
      <LeftBar isHomePage={false}></LeftBar>
      <SettingsMenu />
    </Container>
  )
}

export default Settings