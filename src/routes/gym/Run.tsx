import { Link, useParams } from 'react-router';
import { Button } from '@/components/ui/Button';
import { LaneChip } from '@/components/ui/LaneChip';
import { Wordmark } from '@/components/ui/Wordmark';
import { ArrowLeftIcon } from '@/components/ui/icons';
import { ConfirmDialog } from '@/components/gym/ConfirmDialog';
import { DayPicker } from '@/components/gym/DayPicker';
import { RestBar } from '@/components/gym/RestBar';
import { SessionEntry } from '@/components/gym/SessionEntry';
import { SessionSummary } from '@/components/gym/SessionSummary';
import { useGymSession, type SetRow } from '@/hooks/useGymSession';
import { useT } from '@/hooks/useT';
import {
  exerciseGroup,
  exerciseName,
  formatPrescription,
  formatSetLog,
  measuresTime,
} from '@/lib/gym-format';
import { muscleIconFor } from '@/lib/muscle-icon';

export function GymRun() {
  const { id = '' } = useParams();
  const t = useT();
  const session = useGymSession(id);
  const routine = session.routine;

  return (
    <div className="min-h-dvh bg-chalk text-ink">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink/10 bg-chalk/95 px-3 backdrop-blur sm:px-6">
        <Link
          to={routine ? `/gym/${routine.id}` : '/gym'}
          aria-label={t('nav.back')}
          className="grid size-11 place-items-center rounded-button text-ink hover:bg-ink/10"
        >
          <ArrowLeftIcon />
        </Link>
        <Wordmark label={t('nav.home')} className="text-brand" />
        {routine ? (
          <span className="ml-2 hidden truncate font-bold text-ink-soft sm:inline">
            {routine.name}
          </span>
        ) : null}
        {session.day && session.stage === 'session' ? (
          <LaneChip size="sm" className="ml-auto">
            {session.day.name}
          </LaneChip>
        ) : null}
      </header>

      <main
        className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6"
        style={{ paddingBottom: session.rest.visible ? '9rem' : undefined }}
      >
        {!routine ? (
          <p className="text-3">{t('gym.plan.notFound')}</p>
        ) : session.stage === 'summary' && session.summary ? (
          <SessionSummary
            summary={session.summary}
            backTo={`/gym/${routine.id}`}
            t={t}
            onBack={session.leaveSummary}
          />
        ) : session.stage === 'session' && session.day ? (
          <>
            <h1 className="text-7">{session.day.name}</h1>
            <div className="mt-2">
              {session.day.entries.map((entry) => {
                const rows = session.rowsFor(entry);
                const timeBased = measuresTime(entry.prescription);
                const group = exerciseGroup(entry.ref);
                const previousLabel = (row: SetRow) =>
                  row.previous
                    ? `${t('gym.run.last')} ${formatSetLog(row.previous, t, timeBased)}`
                    : null;
                return (
                  <SessionEntry
                    key={entry.id}
                    id={`entry-${entry.id}`}
                    name={exerciseName(entry.ref, t)}
                    prescription={formatPrescription(entry.prescription, t)}
                    tempo={entry.prescription.tempo}
                    notes={entry.prescription.notes}
                    optionalLabel={entry.prescription.optional ? t('label.optional') : null}
                    icon={group ? muscleIconFor(group) : 'arms'}
                    timeBased={timeBased}
                    rows={rows}
                    previousLabel={previousLabel}
                    t={t}
                    onInput={(row, field, value) => session.setInput(entry.id, row, field, value)}
                    onDone={(row) => session.markDone(entry, row)}
                    onUndo={(row) => session.undoDone(entry, row)}
                    onAddSet={() => session.addSet(entry.id)}
                  />
                );
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <Button size="lg" onClick={session.requestFinish}>
                {t('gym.run.finish')}
              </Button>
            </div>
          </>
        ) : (
          <DayPicker days={routine.days} t={t} onPick={session.pickDay} />
        )}
      </main>

      {session.rest.visible ? (
        <RestBar
          remainingSeconds={session.rest.remainingSeconds}
          progress={session.rest.progress}
          finished={session.rest.finished ?? false}
          label={t('label.rest')}
          finishedLabel={t('gym.run.restDone')}
          skipLabel={t('gym.run.skipRest')}
          onSkip={session.rest.skip}
        />
      ) : null}

      <ConfirmDialog
        id="finish-session"
        open={session.confirmingFinish}
        title={t('gym.run.finishTitle')}
        body={t('gym.run.finishBody', { done: session.doneCount })}
        confirmLabel={t('gym.run.finish')}
        cancelLabel={t('action.cancel')}
        onConfirm={session.confirmFinish}
        onClose={session.cancelFinish}
      />
    </div>
  );
}
