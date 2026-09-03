import { defaultPrescription } from '@/lib/routine-edit';
import type { ExerciseRef, GymEntry, GymPrescription, RepScheme } from '@/lib/types';

export type MeasureKind = RepScheme['kind'];

export interface EntryDraft {
  ref: ExerciseRef | null;
  setsMin: number;
  setsMax: number;
  measure: MeasureKind;
  repsMin: number;
  repsMax: number;
  secondsMin: number;
  secondsMax: number;
  tempo: string;
  perSide: boolean;
  optional: boolean;
  notes: string;
  customRest: boolean;
  restSeconds: number;
}

export function emptyDraft(defaultRestSeconds: number): EntryDraft {
  return draftFromPrescription(null, defaultPrescription(), defaultRestSeconds);
}

export function draftFromEntry(entry: GymEntry, defaultRestSeconds: number): EntryDraft {
  return draftFromPrescription(entry.ref, entry.prescription, defaultRestSeconds);
}

export function draftFromPrescription(
  ref: ExerciseRef | null,
  prescription: GymPrescription,
  defaultRestSeconds: number,
): EntryDraft {
  const reps = prescription.reps.kind === 'reps' ? prescription.reps.reps : { min: 8, max: 12 };
  const seconds =
    prescription.reps.kind === 'time' ? prescription.reps.seconds : { min: 30, max: 30 };
  return {
    ref,
    setsMin: prescription.sets?.min ?? 3,
    setsMax: prescription.sets?.max ?? 3,
    measure: prescription.reps.kind,
    repsMin: reps.min,
    repsMax: reps.max,
    secondsMin: seconds.min,
    secondsMax: seconds.max,
    tempo: prescription.tempo ?? '',
    perSide: prescription.perSide,
    optional: prescription.optional,
    notes: prescription.notes ?? '',
    customRest: prescription.restSeconds !== undefined,
    restSeconds: prescription.restSeconds ?? defaultRestSeconds,
  };
}

export function prescriptionFromDraft(draft: EntryDraft): GymPrescription {
  const tempo = draft.tempo.trim();
  const notes = draft.notes.trim();
  return {
    sets: { min: draft.setsMin, max: Math.max(draft.setsMin, draft.setsMax) },
    reps: repSchemeFromDraft(draft),
    perSide: draft.perSide,
    optional: draft.optional,
    ...(tempo === '' ? {} : { tempo }),
    ...(notes === '' ? {} : { notes }),
    ...(draft.customRest ? { restSeconds: draft.restSeconds } : {}),
  };
}

function repSchemeFromDraft(draft: EntryDraft): RepScheme {
  switch (draft.measure) {
    case 'reps':
      return {
        kind: 'reps',
        reps: { min: draft.repsMin, max: Math.max(draft.repsMin, draft.repsMax) },
      };
    case 'time':
      return {
        kind: 'time',
        seconds: { min: draft.secondsMin, max: Math.max(draft.secondsMin, draft.secondsMax) },
      };
    case 'unspecified':
      return { kind: 'unspecified' };
  }
}
