import type { HiitGroup } from '@/lib/types';

export type MuscleIconName = HiitGroup;

export function muscleIconFor(group: HiitGroup): MuscleIconName {
  return group;
}
