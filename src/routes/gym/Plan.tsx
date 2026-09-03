import { Reorder } from 'motion/react';
import { Link, useParams } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Field, NumberField, TextInput } from '@/components/ui/Field';
import { ArrowLeftIcon, PlusIcon } from '@/components/ui/icons';
import { ConfirmDialog } from '@/components/gym/ConfirmDialog';
import { DaySection } from '@/components/gym/DaySection';
import { EntryDialog } from '@/components/gym/EntryDialog';
import { EntryRow } from '@/components/gym/EntryRow';
import { PlayIcon } from '@/components/gym/gym-icons';
import { useRoutinePlan } from '@/hooks/useRoutinePlan';
import { useT } from '@/hooks/useT';
import { exerciseGroup, exerciseName, formatPrescription } from '@/lib/gym-format';
import { muscleIconFor } from '@/lib/muscle-icon';
import type { ExerciseRef, GymDay, GymRoutine } from '@/lib/types';

export function GymPlan() {
  const { id = '' } = useParams();
  const t = useT();
  const plan = useRoutinePlan(id);
  const nameFor = (ref: ExerciseRef) => exerciseName(ref, t);

  if (!plan.routine) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-3">{t('gym.plan.notFound')}</p>
        <Link to="/gym" className="mt-4 inline-flex items-center gap-2 font-bold text-brand-deep">
          <ArrowLeftIcon /> {t('gym.plan.backToLibrary')}
        </Link>
      </main>
    );
  }

  const routine: GymRoutine = plan.routine;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
      <Link
        to="/gym"
        className="inline-flex items-center gap-2 font-bold text-ink-soft hover:text-ink"
      >
        <ArrowLeftIcon size={20} /> {t('gym.plan.backToLibrary')}
      </Link>

      <Field id="routine-name" label={t('gym.plan.name')} className="mt-4">
        <TextInput
          id="routine-name"
          value={routine.name}
          onChange={(event) => plan.changeName(event.target.value)}
          onBlur={plan.commitName}
          className="h-14 font-display text-6 font-extrabold"
        />
      </Field>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <NumberField
          id="routine-rest"
          label={t('gym.plan.rest')}
          value={routine.restSeconds}
          min={0}
          max={600}
          step={5}
          unit={t('label.seconds')}
          onChange={plan.changeRest}
          className="sm:w-56"
        />
        <Link
          to={`/gym/${routine.id}/run`}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-button bg-brand-deep px-6 font-bold text-3 text-white transition-colors duration-150 hover:bg-[#a81c23]"
        >
          <PlayIcon size={20} />
          {t('gym.library.start')}
        </Link>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {routine.days.map((day, index) => (
          <DaySection
            key={day.id}
            name={day.name}
            notes={day.notes}
            renaming={plan.dayRename?.dayId === day.id}
            renameValue={plan.dayRename?.dayId === day.id ? plan.dayRename.value : ''}
            renameLabel={t('gym.plan.dayName')}
            moveUpLabel={t('gym.plan.moveDayUp')}
            moveDownLabel={t('gym.plan.moveDayDown')}
            removeLabel={t('gym.plan.removeDay')}
            canMoveUp={index > 0}
            canMoveDown={index < routine.days.length - 1}
            canRemove={routine.days.length > 1}
            onRename={() => plan.startDayRename(day)}
            onRenameChange={plan.changeDayRename}
            onRenameCommit={plan.commitDayRename}
            onRenameCancel={plan.cancelDayRename}
            onMoveUp={() => plan.moveDayBy(day, -1)}
            onMoveDown={() => plan.moveDayBy(day, 1)}
            onRemove={() => plan.requestRemoveDay(day)}
          >
            <DayEntries day={day} plan={plan} nameFor={nameFor} />
            <Button variant="ghost" onClick={() => plan.openAdd(day.id)} className="self-start">
              <PlusIcon size={20} />
              {t('gym.plan.addExercise')}
            </Button>
          </DaySection>
        ))}
        <Button variant="secondary" onClick={plan.createDay} className="self-start">
          {t('gym.plan.addDay')}
        </Button>
      </div>

      <EntryDialog
        open={plan.editor !== null}
        editing={plan.editor?.entryId != null}
        sheet={plan.isNarrow}
        draft={plan.draft}
        query={plan.query}
        results={plan.results}
        t={t}
        exerciseName={nameFor}
        onQueryChange={plan.setQuery}
        onPick={plan.pickExercise}
        onDraftChange={plan.updateDraft}
        onSave={plan.saveEntry}
        onRemove={plan.removeEditingEntry}
        onClose={plan.closeEditor}
      />

      <ConfirmDialog
        id="remove-day"
        open={plan.dayToRemove !== null}
        title={t('gym.plan.removeDayTitle')}
        body={t('gym.plan.removeDayBody', {
          name: plan.dayToRemove?.name ?? '',
          count: plan.dayToRemove?.entries.length ?? 0,
        })}
        confirmLabel={t('gym.plan.removeDay')}
        cancelLabel={t('action.cancel')}
        danger
        onConfirm={plan.confirmRemoveDay}
        onClose={plan.cancelRemoveDay}
      />
    </main>
  );
}

interface DayEntriesProps {
  day: GymDay;
  plan: ReturnType<typeof useRoutinePlan>;
  nameFor: (ref: ExerciseRef) => string;
}

function DayEntries({ day, plan, nameFor }: DayEntriesProps) {
  const t = useT();
  if (day.entries.length === 0) {
    return <p className="text-2 text-ink-soft">{t('gym.plan.emptyDay')}</p>;
  }
  return (
    <Reorder.Group
      axis="y"
      as="ul"
      values={day.entries.map((entry) => entry.id)}
      onReorder={(ids: string[]) => plan.reorderEntries(day, ids)}
      className="flex flex-col gap-1.5"
    >
      {day.entries.map((entry, index) => {
        const group = exerciseGroup(entry.ref);
        const restLabel =
          entry.prescription.restSeconds === undefined
            ? undefined
            : `${t('label.rest')} ${entry.prescription.restSeconds} ${t('label.seconds')}`;
        return (
          <EntryRow
            key={entry.id}
            id={entry.id}
            name={nameFor(entry.ref)}
            prescription={formatPrescription(entry.prescription, t)}
            tempo={entry.prescription.tempo}
            notes={entry.prescription.notes}
            optionalLabel={entry.prescription.optional ? t('label.optional') : null}
            icon={group ? muscleIconFor(group) : 'arms'}
            restLabel={restLabel}
            dragLabel={t('gym.plan.drag')}
            editLabel={t('gym.plan.editExercise')}
            moveUpLabel={t('action.moveUp')}
            moveDownLabel={t('action.moveDown')}
            canMoveUp={index > 0}
            canMoveDown={index < day.entries.length - 1}
            onEdit={() => plan.openEdit(day.id, entry)}
            onMoveUp={() => plan.moveEntryBy(day, entry.id, -1)}
            onMoveDown={() => plan.moveEntryBy(day, entry.id, 1)}
          />
        );
      })}
    </Reorder.Group>
  );
}
