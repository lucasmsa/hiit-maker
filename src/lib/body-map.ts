import type { HiitGroup } from '@/lib/types';

export type BodyRegion = Exclude<HiitGroup, 'cardio'>;

export const bodyRegions: BodyRegion[] = ['shoulders', 'chest', 'core', 'arms', 'back', 'legs'];

export interface RegionFill {
  region: BodyRegion;
  count: number;
  opacity: number;
}

export function regionOpacity(count: number): number {
  return count > 0 ? 1 : 0;
}

export function regionFills(counts: Partial<Record<HiitGroup, number>>): RegionFill[] {
  return bodyRegions.map((region) => {
    const count = counts[region] ?? 0;
    return { region, count, opacity: regionOpacity(count) };
  });
}
