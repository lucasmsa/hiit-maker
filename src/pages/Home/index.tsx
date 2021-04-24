import React from 'react'
import LeftBar from '../../components/LeftBar'
import MidSection from '../../components/MidSection'
import WorkoutInformation from '../../components/WorkoutInformation'
import {
  Container
} from './styles'

const Home = () => {
  return (
    <Container>
      <LeftBar />
      <MidSection />
      <WorkoutInformation />
    </Container>
  )
}

export default Home