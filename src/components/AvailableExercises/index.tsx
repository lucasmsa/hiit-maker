import { RouteHandler } from 'miragejs/server'
import React, { useEffect, useState } from 'react'
import runServer from '../../server'
import { Container } from './styles'

interface ExercisesProps {
  chest: Exercise[] | [] | object[];
  legs: Exercise[] | [] | object[];
}

interface Exercise {
  id: string;
  name: string;
  image: string;
  restTime?: string;
}

const AvailableExercises = () => {
  runServer()
  let [exercises, setExercises] = useState<ExercisesProps | any>({
    chest: [],
    legs: []
  })


  useEffect(() => {
    fetch('api/exercises')
      .then((res) => {
        console.log('batata')
        console.log(res)
        return res.json()
      })
      .then((json) => {
        setExercises(json.exercises)
      })
  }, [])

  return (
    <Container>
      {/* {console.log(typeof (exercises))} */}
      {exercises.chest.map((chestExercise: Exercise) => <h1>{chestExercise.name}</h1>)}
    </Container>
  )
}

export default AvailableExercises