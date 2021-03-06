import { INITIAL_DEFAULT_VALUES } from '../../config/contants';

export const exerciseMockCreator = ({
  name,
  image,
  restTime,
  trainTime,
  afflictedBodyPart
}: Exercise) => ({
  name,
  image,
  restTime,
  trainTime,
  afflictedBodyPart
});

export const exerciseMocks = [
  exerciseMockCreator({
    name: 'Squat',
    image: 'squat.png',
    restTime: 10,
    trainTime: 20,
    afflictedBodyPart: 'Legs'
  }),
  exerciseMockCreator({
    name: 'Bench Press',
    image: 'bench-press.png',
    restTime: INITIAL_DEFAULT_VALUES.exerciseRestTime,
    trainTime: INITIAL_DEFAULT_VALUES.exerciseTrainTime,
    afflictedBodyPart: 'Chest'
  }),
  exerciseMockCreator({
    name: 'Deadlift',
    image: 'deadlift.png',
    restTime: 10,
    trainTime: 20,
    afflictedBodyPart: 'Legs'
  })
];
