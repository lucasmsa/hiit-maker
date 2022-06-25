/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import MuscleGroupList from '../HorizontalScrollingImages';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as ChestIcon } from '../../../../assets/images/LeftBar/icons/chest_icon.svg';
import { ReactComponent as LegIcon } from '../../../../assets/images/LeftBar/icons/legs_icon.svg';
import { ReactComponent as BackIcon } from '../../../../assets/images/LeftBar/icons/back_icon.svg';
import { ReactComponent as CoreIcon } from '../../../../assets/images/LeftBar/icons/core_icon.svg';
import { shallowEqual, useSelector } from 'react-redux';
import ExerciseModal from '../InsertExerciseModal';
import Chest from '../../../../database/chest.json';
import Legs from '../../../../database/legs.json';
import Back from '../../../../database/back.json';
import Core from '../../../../database/core.json';
import {
  Container,
  ExerciseAreaContainer,
  ExerciseAreaText,
  ExerciseHeaderContainer,
  ExercisesImagesContainer
} from './styles';
import { getTrainingDefaultValues } from '../../../../store/training/selectors';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

interface IExerciseJSON {
  exercises: {
    [exerciseName: string]: string;
  };
}

const exerciseJSONs = {
  Chest: Chest as IExerciseJSON,
  Legs: Legs as IExerciseJSON,
  Back: Back as IExerciseJSON,
  Core: Core as IExerciseJSON
};

interface AvailableExercisesProps {
  searchExercise: string;
}

const AvailableExercises = ({ searchExercise }: AvailableExercisesProps) => {
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chestExercises, setChestExercises] = useState<Exercise[]>([]);
  const [legsExercises, setLegsExercises] = useState<Exercise[]>([]);
  const [coreExercises, setCoreExercises] = useState<Exercise[]>([]);
  const [backExercises, setBackExercises] = useState<Exercise[]>([]);
  const trainingDefaultValues = useSelector(getTrainingDefaultValues, shallowEqual);
  const [specificExercise, setSpecificExercise] = useState<Exercise>({
    name: '',
    afflictedBodyPart: undefined,
    image: '',
    restTime: trainingDefaultValues.exerciseRestTime,
    trainTime: trainingDefaultValues.exerciseTrainTime
  });

  const bodyPartsSetStates = [
    { Chest: setChestExercises },
    { Legs: setLegsExercises },
    { Back: setBackExercises },
    { Core: setCoreExercises }
  ];

  const exerciseContainerObject = (icon: JSX.Element, list: Exercise[]) => ({
    Icon: icon,
    list: list
  });

  const exerciseContainer: object[] = [
    { Chest: exerciseContainerObject(<ChestIcon />, chestExercises) },
    { Legs: exerciseContainerObject(<LegIcon />, legsExercises) },
    { Back: exerciseContainerObject(<BackIcon />, backExercises) },
    { Core: exerciseContainerObject(<CoreIcon />, coreExercises) }
  ];

  const loadExercises = useCallback(
    (search: string) => {
      bodyPartsSetStates.forEach((exercise) => {
        const afflictedBodyPart = Object.keys(exercise)[0] as AfflictedAreas;
        const setBodyPartExercises = Object.values(exercise)[0] as (
          value: Exercise[] | ((prevVar: Exercise[]) => Exercise[])
        ) => void;

        return fillBodyPartExercises(setBodyPartExercises, afflictedBodyPart, searchExercise);
      });
    },
    [searchExercise]
  );

  useEffect(() => {
    loadExercises(searchExercise);
  }, [loadExercises]);

  const exerciseNameAndImageToExerciseCard = (
    exercises: Pairs<string, string>,
    bodyPart: AfflictedAreas
  ) => {
    exercises.forEach((exerciseInfo, index, array) => {
      const exerciseName = exerciseInfo[0];
      const exerciseImage = exerciseInfo[1];
      array[index] = {
        name: exerciseName,
        image: exerciseImage,
        afflictedBodyPart: bodyPart,
        restTime: trainingDefaultValues.exerciseRestTime,
        trainTime: trainingDefaultValues.exerciseTrainTime
      } as any;
    }, exercises);

    return exercises as unknown as Exercise[];
  };

  const filterExercisesByName = (bodyPart: AfflictedAreas): Exercise[] => {
    let exercises = exerciseNameAndImageToExerciseCard(
      Object.entries(exerciseJSONs[bodyPart].exercises).filter((exerciseInfo) => {
        const exerciseName = exerciseInfo[0];

        return exerciseName.toLowerCase().includes(searchExercise.toLowerCase());
      }),
      bodyPart
    );

    return exercises;
  };

  const fillBodyPartExercises = useCallback(
    (
      setBodyPartExercises: (value: Exercise[] | ((prevVar: Exercise[]) => Exercise[])) => void,
      bodyPart: AfflictedAreas,
      searchExercise: string
    ) => {
      let exercises: Exercise[] = searchExercise
        ? filterExercisesByName(bodyPart)
        : exerciseNameAndImageToExerciseCard(
            Object.entries(exerciseJSONs[bodyPart].exercises),
            bodyPart
          );

      setBodyPartExercises((bodyPartExercises: Exercise[]) => exercises as Exercise[]);
    },
    [searchExercise]
  );

  const handleSpecificExercise = useCallback((exerciseName: string, bodyPart: AfflictedAreas) => {
    const exerciseImage = exerciseJSONs[bodyPart].exercises[exerciseName];
    setSpecificExercise({
      name: exerciseName,
      image: exerciseImage,
      afflictedBodyPart: bodyPart,
      restTime: trainingDefaultValues.exerciseRestTime,
      trainTime: trainingDefaultValues.exerciseTrainTime
    });
  }, []);

  return (
    <Container>
      <AnimatePresence>
        <ExerciseModal
          modalOpen={modalOpen}
          specificExercise={specificExercise}
          closeModal={() => setModalOpen(false)}
        />
      </AnimatePresence>

      {exerciseContainer.map((element: any, index) => {
        const bodyPart = Object.keys(element)[0] as AfflictedAreas;
        const icon = element[bodyPart].Icon;
        const exerciseList = element[bodyPart].list;

        return exerciseList.length ? (
          <ExerciseAreaContainer key={index}>
            <ExerciseHeaderContainer>
              {icon}
              <ExerciseAreaText>{bodyPart}</ExerciseAreaText>
            </ExerciseHeaderContainer>
            <ExercisesImagesContainer>
              <MuscleGroupList
                selectedExercise={selectedExercise}
                setSelectedExercise={(key: any) => {
                  setSelectedExercise(key);
                  handleSpecificExercise(key, bodyPart);
                  setModalOpen(true);
                }}
                list={exerciseList}
              />
            </ExercisesImagesContainer>
          </ExerciseAreaContainer>
        ) : (
          <></>
        );
      })}
    </Container>
  );
};

export default AvailableExercises;
