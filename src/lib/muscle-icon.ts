import type { GymMuscleGroup, HiitGroup } from '@/lib/types';

export type MuscleIconName = HiitGroup;

const gymToIcon: Record<GymMuscleGroup, MuscleIconName> = {
  chest: 'chest',
  back: 'back',
  shoulders: 'shoulders',
  arms: 'arms',
  forearms: 'arms',
  legs: 'legs',
  glutes: 'legs',
  calves: 'legs',
  core: 'core',
  'rotator-cuff': 'shoulders',
  mobility: 'back',
};

export function muscleIconFor(group: HiitGroup | GymMuscleGroup): MuscleIconName {
  return gymToIcon[group as GymMuscleGroup] ?? (group as HiitGroup);
}
