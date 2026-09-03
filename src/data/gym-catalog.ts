import type { GymEquipment, GymExercise, GymMuscleGroup } from '@/lib/types';

function exercise(id: string, muscleGroup: GymMuscleGroup, ...equipment: GymEquipment[]): GymExercise {
  return { id, muscleGroup, equipment };
}

export const gymGroups: GymMuscleGroup[] = [
  'chest',
  'back',
  'shoulders',
  'arms',
  'forearms',
  'legs',
  'glutes',
  'calves',
  'core',
  'rotator-cuff',
  'mobility',
];

export const gymCatalog: GymExercise[] = [
  exercise('banded-w-rotation', 'rotator-cuff', 'band'),
  exercise('quadruped-external-rotation-hold', 'rotator-cuff', 'dumbbell'),
  exercise('seated-plate-rotation', 'rotator-cuff', 'plate', 'dumbbell'),
  exercise('face-pull', 'rotator-cuff', 'cable'),

  exercise('incline-dumbbell-press', 'chest', 'dumbbell'),
  exercise('flat-dumbbell-press', 'chest', 'dumbbell'),
  exercise('bench-press', 'chest', 'barbell'),
  exercise('machine-chest-press', 'chest', 'machine'),
  exercise('cable-fly', 'chest', 'cable'),

  exercise('lateral-raise', 'shoulders', 'dumbbell'),
  exercise('overhead-press', 'shoulders', 'barbell', 'dumbbell'),
  exercise('trap-3-raise', 'shoulders', 'dumbbell'),

  exercise('weighted-pull-up', 'back', 'bodyweight', 'plate'),
  exercise('lat-pulldown', 'back', 'cable', 'machine'),
  exercise('barbell-row', 'back', 'barbell'),
  exercise('cable-row', 'back', 'cable'),
  exercise('dumbbell-shrug', 'back', 'dumbbell'),

  exercise('cable-pushdown', 'arms', 'cable'),
  exercise('biceps-curl', 'arms', 'dumbbell', 'barbell'),
  exercise('hammer-curl', 'arms', 'dumbbell'),

  exercise('wrist-curl', 'forearms', 'dumbbell', 'barbell'),
  exercise('forearm-rotation', 'forearms', 'dumbbell'),

  exercise('squat', 'legs', 'barbell'),
  exercise('leg-press', 'legs', 'machine'),
  exercise('romanian-deadlift', 'legs', 'barbell', 'dumbbell'),
  exercise('deadlift', 'legs', 'barbell'),
  exercise('bulgarian-split-squat', 'legs', 'dumbbell', 'bodyweight'),
  exercise('lunge', 'legs', 'dumbbell', 'bodyweight'),
  exercise('leg-curl', 'legs', 'machine'),
  exercise('leg-extension', 'legs', 'machine'),

  exercise('hip-thrust', 'glutes', 'barbell', 'machine'),
  exercise('calf-raise', 'calves', 'machine', 'bodyweight'),

  exercise('hollow-body-hold', 'core', 'bodyweight'),
  exercise('ab-wheel', 'core', 'bodyweight'),
  exercise('plank', 'core', 'bodyweight'),

  exercise('thoracic-extension', 'mobility', 'foam-roller'),
  exercise('levator-scapulae-stretch', 'mobility', 'bodyweight'),
];

const gymById = new Map(gymCatalog.map((entry) => [entry.id, entry]));

export function findGymExercise(id: string): GymExercise | undefined {
  return gymById.get(id);
}

export function gymExercisesIn(group: GymMuscleGroup): GymExercise[] {
  return gymCatalog.filter((entry) => entry.muscleGroup === group);
}
