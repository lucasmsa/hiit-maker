import { Button } from '@/components/ui/Button';
import { BottomSheet, Dialog } from '@/components/ui/Dialog';
import { ExercisePicker } from '@/components/gym/ExercisePicker';
import { PrescriptionForm } from '@/components/gym/PrescriptionForm';
import type { EntryDraft } from '@/lib/gym-draft';
import type { GymSearchGroup } from '@/lib/gym-search';
import type { Translate } from '@/lib/i18n';
import type { ExerciseRef } from '@/lib/types';

interface EntryDialogProps {
  open: boolean;
  editing: boolean;
  sheet: boolean;
  draft: EntryDraft;
  query: string;
  results: GymSearchGroup[];
  t: Translate;
  exerciseName: (ref: ExerciseRef) => string;
  onQueryChange: (value: string) => void;
  onPick: (ref: ExerciseRef) => void;
  onDraftChange: (patch: Partial<EntryDraft>) => void;
  onSave: () => void;
  onRemove: () => void;
  onClose: () => void;
}

export function EntryDialog({
  open,
  editing,
  sheet,
  draft,
  query,
  results,
  t,
  exerciseName,
  onQueryChange,
  onPick,
  onDraftChange,
  onSave,
  onRemove,
  onClose,
}: EntryDialogProps) {
  const Container = sheet ? BottomSheet : Dialog;
  const title = editing && draft.ref ? exerciseName(draft.ref) : t('gym.plan.addExercise');
  return (
    <Container id="entry-editor" open={open} onClose={onClose} title={title}>
      <div className="flex flex-col gap-5">
        {editing ? null : (
          <ExercisePicker
            id="entry-editor"
            query={query}
            results={results}
            selected={draft.ref}
            t={t}
            exerciseName={exerciseName}
            onQueryChange={onQueryChange}
            onPick={onPick}
          />
        )}
        <PrescriptionForm id="entry-editor" draft={draft} t={t} onChange={onDraftChange} />
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {editing ? (
            <Button variant="danger" onClick={onRemove}>
              {t('gym.entry.remove')}
            </Button>
          ) : null}
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              {t('action.cancel')}
            </Button>
            <Button
              onClick={onSave}
              disabled={draft.ref === null}
              title={draft.ref ? undefined : t('gym.entry.pickFirst')}
            >
              {t('action.save')}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
