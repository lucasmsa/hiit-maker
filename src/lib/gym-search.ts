import { gymCatalog, gymGroups } from '@/data/gym-catalog';
import type { I18nKey } from '@/data/i18n';
import type { Translate } from '@/lib/i18n';
import type { GymExercise, GymMuscleGroup } from '@/lib/types';

export interface GymSearchGroup {
  group: GymMuscleGroup;
  exercises: GymExercise[];
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function searchGymCatalog(query: string, t: Translate): GymSearchGroup[] {
  const needle = normalize(query.trim());
  return gymGroups
    .map((group) => {
      const groupName = normalize(t(`group.${group}`));
      const exercises = gymCatalog.filter((exercise) => {
        if (exercise.muscleGroup !== group) {
          return false;
        }
        if (needle === '') {
          return true;
        }
        const name = normalize(t(`gym.exercise.${exercise.id}` as I18nKey));
        return name.includes(needle) || groupName.includes(needle);
      });
      return { group, exercises };
    })
    .filter((entry) => entry.exercises.length > 0);
}
