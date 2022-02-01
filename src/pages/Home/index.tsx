import React from 'react'
import LeftBar from '../../components/Home/LeftBar'
import MidSection from '../../components/Home/MidSection'
import WorkoutInformation from '../../components/Home/WorkoutInformation'
import {
  Container
} from './styles'

const Home = () => {
  return (
    <Container>
      <LeftBar isHomePage/>
      <MidSection />
      <WorkoutInformation />
    </Container>
  )
}

export default Home