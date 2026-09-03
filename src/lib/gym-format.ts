import { findGymExercise } from '@/data/gym-catalog';
import type { I18nKey } from '@/data/i18n';
import type { Translate } from '@/lib/i18n';
import type {
  ExerciseRef,
  GymMuscleGroup,
  GymPrescription,
  GymSessionLog,
  Range,
  SetLog,
} from '@/lib/types';

export function formatRange(range: Range): string {
  return range.min === range.max ? String(range.min) : `${range.min}-${range.max}`;
}

export function formatPrescription(prescription: GymPrescription, t: Translate): string {
  const sets = prescription.sets ? formatRange(prescription.sets) : null;
  const measure = formatMeasure(prescription, t);
  const parts: string[] = [];
  if (sets && measure) {
    parts.push(`${sets} x ${measure}`);
  } else if (sets) {
    parts.push(t('gym.format.setsOnly', { sets }));
  } else if (measure) {
    parts.push(measure);
  }
  if (prescription.perSide) {
    parts.push(t('label.perSide'));
  }
  return parts.join(' ');
}

function formatMeasure(prescription: GymPrescription, t: Translate): string | null {
  switch (prescription.reps.kind) {
    case 'reps':
      return formatRange(prescription.reps.reps);
    case 'time':
      return t('gym.format.holdSeconds', { value: formatRange(prescription.reps.seconds) });
    case 'unspecified':
      return null;
  }
}

export function exerciseName(ref: ExerciseRef, t: Translate): string {
  if (ref.kind === 'custom') {
    return ref.name;
  }
  return findGymExercise(ref.exerciseId)
    ? t(`gym.exercise.${ref.exerciseId}` as I18nKey)
    : ref.exerciseId;
}

export function exerciseGroup(ref: ExerciseRef): GymMuscleGroup | undefined {
  return ref.kind === 'catalog' ? findGymExercise(ref.exerciseId)?.muscleGroup : undefined;
}

export function plannedSetCount(prescription: GymPrescription): number {
  return prescription.sets?.max ?? 1;
}

export function measuresTime(prescription: GymPrescription): boolean {
  return prescription.reps.kind === 'time';
}

export function doneSets(log: GymSessionLog): SetLog[] {
  return Object.values(log.entries)
    .flat()
    .filter((set) => set.done);
}

export function sessionVolumeKg(log: GymSessionLog): number {
  return doneSets(log).reduce((total, set) => {
    if (set.weightKg === undefined || set.reps === undefined) {
      return total;
    }
    return total + set.weightKg * set.reps;
  }, 0);
}

export function sessionDurationMs(log: GymSessionLog, now: number): number {
  return Math.max(0, (log.finishedAt ?? now) - log.startedAt);
}

export function formatSetLog(set: SetLog, t: Translate, timeBased: boolean): string {
  const parts: string[] = [];
  if (set.weightKg !== undefined) {
    parts.push(`${formatWeight(set.weightKg)} ${t('unit.kg')}`);
  }
  if (set.reps !== undefined) {
    parts.push(timeBased ? `${set.reps} ${t('label.seconds')}` : `${set.reps} ${t('label.reps')}`);
  }
  return parts.join(' x ');
}

export function formatWeight(weightKg: number): string {
  return Number.isInteger(weightKg) ? String(weightKg) : weightKg.toFixed(1).replace(/\.0$/, '');
}

export function routineEntryCount(days: { entries: unknown[] }[]): number {
  return days.reduce((total, day) => total + day.entries.length, 0);
}

export function formatDate(timestamp: number, language: string): string {
  return new Intl.DateTimeFormat(language, { day: 'numeric', month: 'short' }).format(
    new Date(timestamp),
  );
}

export function formatDuration(ms: number): string {
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  return `${hours} h ${String(minutes % 60).padStart(2, '0')} min`;
}
