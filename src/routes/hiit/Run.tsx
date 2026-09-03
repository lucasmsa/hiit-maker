import '@/styles/run.css';
import { ConfirmDialog } from '@/components/run/ConfirmDialog';
import { RoundButtons } from '@/components/run/RoundButtons';
import { RunChips } from '@/components/run/RunChips';
import { RunClock } from '@/components/run/RunClock';
import { RunFrame } from '@/components/run/RunFrame';
import { RunGate } from '@/components/run/RunGate';
import { RunSideBar } from '@/components/run/RunSideBar';
import { Button } from '@/components/ui/Button';
import { LaneChip } from '@/components/ui/LaneChip';
import { Wordmark } from '@/components/ui/Wordmark';
import { useHiitRun, type HiitRunActions, type HiitRunView } from '@/hooks/useHiitRun';
import { useT } from '@/hooks/useT';
import type { Translate } from '@/lib/i18n';

export function HiitRun() {
  const t = useT();
  const { view, actions } = useHiitRun();

  if (view.screen === 'missing') {
    return (
      <main className="run-missing">
        <div className="grid justify-items-center gap-6">
          <LaneChip className="run-chip">{t('hiit.run.notFound')}</LaneChip>
          <Button variant="primary" size="lg" onClick={actions.goToLibrary}>
            {t('hiit.run.library')}
          </Button>
        </div>
      </main>
    );
  }

  const live = view.screen === 'live';

  return (
    <main className="run" data-live={live}>
      <div className="run-main">
        <header className="run-header">
          {live ? <RunChips setText={view.chipSet} phaseText={view.chipPhase} /> : <div />}
          <Wordmark to={`/hiit/${view.workoutId}`} label={t('hiit.run.backToBuilder')} className="run-logo" />
        </header>
        {renderBody(view, actions, t)}
      </div>
      {live ? (
        <RunSideBar
          title={t('hiit.run.next.title')}
          upcoming={view.upcoming}
          emptyText={t('hiit.run.next.none')}
          progressTitle={t('hiit.run.progress')}
          rows={view.rows}
          footer={view.repsText}
          soundLabel={t('hiit.run.sound')}
          muted={view.muted}
          onMutedChange={actions.setMuted}
          exitLabel={t('hiit.run.exit')}
          onExit={actions.requestExit}
        />
      ) : null}
      <ConfirmDialog
        id="run-stop"
        open={view.stopOpen}
        title={t('hiit.run.stop.title')}
        body={t('hiit.run.stop.body')}
        confirmLabel={t('hiit.run.stop.confirm')}
        cancelLabel={t('action.cancel')}
        onConfirm={actions.confirmStop}
        onCancel={actions.cancelStop}
      />
      <ConfirmDialog
        id="run-exit"
        open={view.exitOpen}
        title={t('hiit.run.exit.title')}
        body={t('hiit.run.exit.body')}
        confirmLabel={t('hiit.run.exit.confirm')}
        cancelLabel={t('action.cancel')}
        onConfirm={actions.confirmExit}
        onCancel={actions.cancelExit}
      />
    </main>
  );
}

function renderBody(view: HiitRunView, actions: HiitRunActions, t: Translate) {
  switch (view.screen) {
    case 'start':
      return (
        <RunGate
          chip={t('hiit.run.startNow')}
          title={view.workoutName}
          clock={view.totalClock}
          clockLabel={t('hiit.run.total')}
          meta={setsText(view.setCount, t)}
          primaryLabel={t('hiit.run.start')}
          onPrimary={actions.start}
        />
      );
    case 'resume':
      return (
        <RunGate
          chip={t('hiit.run.phase.paused')}
          title={view.workoutName}
          clock={view.totalRemainingClock}
          clockLabel={t('hiit.run.remaining')}
          meta={t('hiit.run.remaining')}
          primaryLabel={t('hiit.run.resume')}
          onPrimary={actions.togglePause}
          secondaryLabel={t('hiit.run.stop.confirm')}
          onSecondary={actions.requestStop}
        />
      );
    case 'other':
      return (
        <RunGate
          chip={t('hiit.run.phase.paused')}
          title={t('hiit.run.other.title')}
          body={t('hiit.run.other.body', { name: view.otherWorkoutName })}
          primaryLabel={t('hiit.run.other.resume')}
          onPrimary={actions.resumeOther}
          secondaryLabel={t('hiit.run.other.start')}
          onSecondary={actions.start}
        />
      );
    case 'done':
      return (
        <section className="run-stage">
          <RunFrame color={view.frameColor} art={view.frameArt} />
          <RunGate
            chip={t('hiit.run.phase.done')}
            title={t('run.finished')}
            clock={view.totalClock}
            clockLabel={t('hiit.run.total')}
            meta={t('hiit.run.done.sets', { count: view.setCount })}
            primaryLabel={t('hiit.run.done.again')}
            onPrimary={actions.start}
            secondaryLabel={t('hiit.run.done.back')}
            onSecondary={actions.goToWorkout}
          />
        </section>
      );
    case 'live':
      return (
        <section className="run-stage">
          <RunFrame color={view.frameColor} art={view.frameArt} />
          <RunClock
            label={view.label}
            labelColor={view.labelColor}
            clock={view.remainingClock}
            clockLabel={t('hiit.run.remaining')}
            nextText={view.nextText}
          />
          <RoundButtons
            isPaused={view.isPaused}
            pulsing={view.isLive}
            pauseLabel={t('action.pause')}
            resumeLabel={t('action.resume')}
            onTogglePause={actions.togglePause}
            stopLabel={t('action.stop')}
            onStop={actions.requestStop}
            backLabel={t('hiit.run.back')}
            onBack={actions.back}
            skipLabel={t('hiit.run.skip')}
            onSkip={actions.skip}
            hint={t('hiit.run.pauseHint')}
          />
        </section>
      );
    default:
      return null;
  }
}

function setsText(count: number, t: Translate): string {
  return count === 1 ? t('hiit.run.sets.one') : t('hiit.run.sets.many', { count });
}
