import { Link, useParams } from 'react-router';
import { Button } from '@/components/ui/Button';
import { LaneChip } from '@/components/ui/LaneChip';
import { BrandRail } from '@/components/shell/BrandRail';
import { ChevronLeftIcon } from '@/components/shell/shell-icons';
import { ConfirmDialog } from '@/components/gym/ConfirmDialog';
import { DayPicker } from '@/components/gym/DayPicker';
import { RestBar } from '@/components/gym/RestBar';
import { SessionEntry } from '@/components/gym/SessionEntry';
import { SessionSummary } from '@/components/gym/SessionSummary';
import { useGymSession, type SetRow } from '@/hooks/useGymSession';
import { useShell } from '@/hooks/useShell';
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
  const shell = useShell();
  const session = useGymSession(id);
  const routine = session.routine;

  return (
    <div className="min-h-dvh bg-paper text-ink lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <BrandRail
        currentMode="gym"
        languageLabel={shell.languageLabel}
        onToggleLanguage={shell.toggleLanguage}
      />
      <main
        className="mx-auto w-full max-w-3xl min-w-0 px-4 py-6 sm:px-8"
        style={{ paddingBottom: session.rest.visible ? '9rem' : undefined }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link to={routine ? `/gym/${routine.id}` : '/gym'} className="back-link">
            <span className="back-link-circle">
              <ChevronLeftIcon size={20} />
            </span>
            {routine ? routine.name : t('nav.back')}
          </Link>
          {session.day && session.stage === 'session' ? (
            <LaneChip className="ml-auto">{session.day.name}</LaneChip>
          ) : null}
        </div>

        <div className="mt-6">
          {!routine ? (
            <section className="card px-6 py-10 text-center">
              <p className="text-ink-soft">{t('gym.plan.notFound')}</p>
            </section>
          ) : session.stage === 'summary' && session.summary ? (
            <SessionSummary
              summary={session.summary}
              backTo={`/gym/${routine.id}`}
              t={t}
              onBack={session.leaveSummary}
            />
          ) : session.stage === 'session' && session.day ? (
            <>
              <h1 className="card-title justify-start">{session.day.name}</h1>
              <div className="mt-6 flex flex-col gap-5">
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
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="black-pill">{t('gym.run.doneCount', { done: session.doneCount })}</p>
                <Button size="lg" onClick={session.requestFinish} className="rounded-full">
                  {t('gym.run.finish')}
                </Button>
              </div>
            </>
          ) : (
            <DayPicker days={routine.days} t={t} onPick={session.pickDay} />
          )}
        </div>
      </main>

      {session.rest.visible ? (
        <RestBar
          remainingSeconds={session.rest.remainingSeconds}
          progress={session.rest.progress}
          finished={session.rest.finished ?? false}
          label={t('gym.run.restLabel')}
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
