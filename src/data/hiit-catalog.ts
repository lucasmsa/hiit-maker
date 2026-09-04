import type { HiitExercise, HiitGroup } from '@/lib/types';

const byGroup: Record<HiitGroup, string[]> = {
  chest: ['push-up', 'archer-push-up', 'diamond-push-up', 'decline-push-up', 'explosive-push-up', 'dips'],
  back: ['pull-up', 'chin-up', 'wide-push-up', 'superman', 'reverse-fly', 'bent-over-lat-pulldown'],
  legs: ['squat', 'archer-squat', 'pistol-squat', 'jump-squat', 'alternating-lunge', 'elevated-lunge'],
  core: ['crunch', 'dead-bug', 'leg-raise', 'plank', 'side-plank', 'bicycle-crunch'],
  shoulders: ['pike-push-up', 'shoulder-tap', 'wall-handstand-hold', 'arm-circles', 'plank-to-down-dog'],
  arms: ['bench-dip', 'close-grip-push-up', 'isometric-chin-up-hold', 'plank-up-down'],
  cardio: ['burpee', 'mountain-climber', 'high-knees', 'jumping-jack', 'skater-jump', 'butt-kick', 'tuck-jump'],
};

export const hiitGroups: HiitGroup[] = ['chest', 'back', 'legs', 'core', 'shoulders', 'arms', 'cardio'];

export const hiitCatalog: HiitExercise[] = hiitGroups.flatMap((group) =>
  byGroup[group].map((id) => ({ id, group, photo: id })),
);

const hiitById = new Map(hiitCatalog.map((exercise) => [exercise.id, exercise]));

export function findHiitExercise(id: string): HiitExercise | undefined {
  return hiitById.get(id);
}

export function hiitExercisesIn(group: HiitGroup): HiitExercise[] {
  return hiitCatalog.filter((exercise) => exercise.group === group);
}
