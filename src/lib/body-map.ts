import type { HiitGroup } from '@/lib/types';

export type BodyRegion = Exclude<HiitGroup, 'cardio'>;

export const bodyRegions: BodyRegion[] = ['shoulders', 'chest', 'core', 'arms', 'back', 'legs'];

export interface RegionFill {
  region: BodyRegion;
  count: number;
  opacity: number;
}

export function regionOpacity(count: number, max: number): number {
  if (count <= 0 || max <= 0) {
    return 0;
  }
  return Math.round((0.3 + 0.7 * (count / max)) * 100) / 100;
}

export function regionFills(counts: Partial<Record<HiitGroup, number>>): RegionFill[] {
  const max = Math.max(0, ...bodyRegions.map((region) => counts[region] ?? 0));
  return bodyRegions.map((region) => {
    const count = counts[region] ?? 0;
    return { region, count, opacity: regionOpacity(count, max) };
  });
}
