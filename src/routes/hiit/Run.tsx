import '@/styles/run.css';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/run/ConfirmDialog';
import { RunControls } from '@/components/run/RunControls';
import { RunGate } from '@/components/run/RunGate';
import { RunGround } from '@/components/run/RunGround';
import { RunStage } from '@/components/run/RunStage';
import { RunTopBar } from '@/components/run/RunTopBar';
import { useHiitRun, type HiitRunActions, type HiitRunView } from '@/hooks/useHiitRun';
import { useT } from '@/hooks/useT';
import type { Translate } from '@/lib/i18n';
import { groundColor } from '@/lib/run-view';

export function HiitRun() {
  const t = useT();
  const { view, actions } = useHiitRun();

  if (view.screen === 'missing') {
    return (
      <main className="run-missing">
        <div className="grid gap-6">
          <h1 className="text-7">{t('hiit.run.notFound')}</h1>
          <Button variant="inverse" size="lg" onClick={actions.goToLibrary}>
            {t('hiit.run.library')}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <RunGround kind={view.screen === 'live' ? view.ground : 'done'} phaseKey={view.phaseKey}>
      <RunTopBar
        exitLabel={t('hiit.run.exit')}
        onExit={actions.requestExit}
        soundLabel={t('hiit.run.sound')}
        muted={view.muted}
        onMutedChange={actions.setMuted}
      />
      {renderBody(view, actions, t)}
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
    </RunGround>
  );
}

function renderBody(view: HiitRunView, actions: HiitRunActions, t: Translate) {
  switch (view.screen) {
    case 'start':
      return (
        <RunGate
          word={t('hiit.run.phase.ready')}
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
          word={t('hiit.run.phase.paused')}
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
          word={t('hiit.run.phase.paused')}
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
        <RunGate
          word={t('hiit.run.phase.done')}
          title={t('run.finished')}
          clock={view.totalClock}
          clockLabel={t('hiit.run.total')}
          meta={t('hiit.run.done.sets', { count: view.setCount })}
          primaryLabel={t('hiit.run.done.again')}
          onPrimary={actions.start}
          secondaryLabel={t('hiit.run.done.back')}
          onSecondary={actions.goToWorkout}
        />
      );
    case 'live':
      return (
        <>
          <RunStage
            phaseWord={view.phaseWord}
            remainingClock={view.remainingClock}
            remainingLabel={t('hiit.run.remaining')}
            exercise={view.ground === 'train' ? view.exercise : undefined}
            upcoming={view.ground === 'train' ? undefined : view.upcoming}
            upcomingLabel={t('run.next')}
            upcomingVisual={view.upcomingVisual}
            showUpcomingTile={view.ground !== 'train'}
            positionText={positionText(view, t)}
          />
          <RunControls
            isPaused={view.isPaused}
            pauseLabel={t('action.pause')}
            resumeLabel={t('action.resume')}
            backLabel={t('hiit.run.back')}
            skipLabel={t('hiit.run.skip')}
            stopLabel={t('action.stop')}
            onTogglePause={actions.togglePause}
            onBack={actions.back}
            onSkip={actions.skip}
            onStop={actions.requestStop}
            phaseProgress={view.phaseProgress}
            phaseColor={groundColor[view.ground]}
            phaseLabel={t('hiit.run.phaseProgress')}
            workoutProgress={view.workoutProgress}
            workoutLabel={t('hiit.run.workoutProgress')}
          />
        </>
      );
    default:
      return null;
  }
}

function positionText(view: HiitRunView, t: Translate): string | undefined {
  if (!view.position) {
    return undefined;
  }
  const set = t('run.setOf', { current: view.position.set, total: view.position.setCount });
  const loop = t('run.loopOf', { current: view.position.loop, total: view.position.loopCount });
  return `${set}, ${loop.toLowerCase()}`;
}

function setsText(count: number, t: Translate): string {
  return count === 1 ? t('hiit.run.sets.one') : t('hiit.run.sets.many', { count });
}
