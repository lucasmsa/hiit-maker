import '@/styles/builder.css';
import type { CSSProperties } from 'react';
import { MotionConfig } from 'motion/react';
import { Link, useParams } from 'react-router';
import { Button } from '@/components/ui/Button';
import { BottomSheet, Dialog } from '@/components/ui/Dialog';
import { Digits } from '@/components/ui/Digits';
import { Banner } from '@/components/hiit/Banner';
import { BuilderRail } from '@/components/hiit/BuilderRail';
import { BuilderTopBar } from '@/components/hiit/BuilderTopBar';
import { CatalogRail } from '@/components/hiit/CatalogRail';
import { ExerciseOptionsDialog } from '@/components/hiit/ExerciseOptionsDialog';
import { LinkButton } from '@/components/hiit/LinkButton';
import { NameRow } from '@/components/hiit/NameRow';
import { RunnerIcon } from '@/components/hiit/OriginalIcons';
import { PillNumber } from '@/components/hiit/PillNumber';
import { SetCard } from '@/components/hiit/SetCard';
import { SetStepper } from '@/components/hiit/SetStepper';
import { WorkoutSummary } from '@/components/hiit/WorkoutSummary';
import { WorkoutSwitcher } from '@/components/hiit/WorkoutSwitcher';
import { useBuilder } from '@/hooks/useBuilder';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useT } from '@/hooks/useT';
import { useWorkoutSwitcher } from '@/hooks/useWorkoutSwitcher';
import { formatClock } from '@/lib/digits';

const barDigits = { '--digits-size': '2rem', fontWeight: 600 } as CSSProperties;

export function HiitBuilder() {
  const { id } = useParams();
  const t = useT();
  const desktop = useMediaQuery('(min-width: 1024px)');
  const builder = useBuilder(id);
  const switcher = useWorkoutSwitcher(builder.workout?.id ?? null, builder.focusName);
  const { workout, summary, currentSet } = builder;

  if (builder.missing) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-3">{t('hiit.builder.notFound')}</p>
        <LinkButton to="/hiit" variant="secondary" className="mt-6">
          {t('hiit.builder.back')}
        </LinkButton>
      </main>
    );
  }

  if (!workout || !summary || !currentSet) {
    return null;
  }

  const canStart = summary.exerciseCount > 0;
  const catalogProps = {
    query: builder.query,
    onQueryChange: builder.setQuery,
    groups: builder.catalog,
    placedIds: builder.placedIds,
    onSelect: builder.addFromCatalog,
  };
  const stepperProps = {
    count: workout.sets.length,
    currentIndex: builder.currentSetIndex,
    onSelect: builder.selectSet,
    onAdd: builder.addSet,
    onRemove: builder.removeCurrentSet,
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="builder">
        {desktop ? <BuilderRail {...catalogProps} /> : null}

        <div className="flex min-w-0 flex-col">
          {desktop ? null : <BuilderTopBar />}
          <Banner />
          <main
            id="workout-editor"
            tabIndex={-1}
            className="flex flex-col gap-6 px-4 pb-32 pt-6 outline-none sm:px-8 lg:pb-12"
          >
            <div className="flex flex-wrap items-end gap-6">
              <div className="min-w-0 flex-1">
                <NameRow
                  value={builder.nameValue}
                  inputRef={builder.nameInputRef}
                  onChange={builder.changeName}
                  onCommit={builder.commitName}
                  onOpenSwitcher={switcher.show}
                />
              </div>
              <PillNumber
                id="workout-warmup"
                label={t('label.warmup')}
                value={workout.warmupSeconds}
                onChange={builder.setWarmup}
                min={0}
                max={600}
                step={15}
                unit={t('label.seconds')}
              />
            </div>

            <div className="flex justify-center gap-2 lg:gap-4">
              {desktop ? <SetStepper orientation="vertical" {...stepperProps} /> : null}
              <div className="flex w-full max-w-[590px] flex-col gap-4">
                {desktop ? null : <SetStepper orientation="horizontal" {...stepperProps} />}
                <SetCard
                  set={currentSet}
                  index={builder.currentSetIndex}
                  flashId={builder.flashId}
                  showAddExercise={!desktop}
                  onClear={builder.requestClearSet}
                  onLoops={builder.setLoops}
                  onSetRest={builder.setSetRest}
                  onAddExercise={builder.openSheet}
                  onTrain={builder.setTrain}
                  onRest={builder.setRest}
                  onRemoveExercise={builder.removeExercise}
                  onReorder={builder.reorder}
                  onOptions={builder.openOptions}
                />
              </div>
            </div>
          </main>
        </div>

        <aside className="hidden border-l border-paper-dim py-6 lg:block">
          <WorkoutSummary
            workoutId={workout.id}
            summary={summary}
            counts={builder.counts}
            share={builder.share}
          />
        </aside>
      </div>

      {desktop ? null : (
        <div className="builder-bottom-bar">
          <div className="flex flex-col">
            <span className="text-1 font-bold text-ink-soft">{t('label.totalTime')}</span>
            <Digits
              value={formatClock(summary.totalSeconds * 1000)}
              label={t('label.totalTime')}
              className="text-brand"
              style={barDigits}
            />
          </div>
          {canStart ? (
            <Link
              to={`/hiit/${workout.id}/run`}
              className="summary-chip"
              data-fit="true"
              data-tone="brand"
            >
              <RunnerIcon size={24} />
              {t('hiit.builder.startNow')}
            </Link>
          ) : (
            <span
              className="summary-chip"
              data-fit="true"
              data-tone="brand"
              data-disabled="true"
              aria-disabled="true"
            >
              <RunnerIcon size={24} />
              {t('hiit.builder.startNow')}
            </span>
          )}
        </div>
      )}

      <BottomSheet
        id="catalog-sheet"
        open={builder.sheetOpen}
        onClose={builder.closeSheet}
        title={t('hiit.builder.catalog')}
      >
        {builder.sheetOpen ? <CatalogRail id="sheet" onRail={false} {...catalogProps} /> : null}
      </BottomSheet>

      <WorkoutSwitcher switcher={switcher} />

      <ExerciseOptionsDialog
        exercise={builder.optionsExercise}
        set={currentSet}
        allSets={workout.sets}
        onClose={builder.closeOptions}
        onMoveBy={builder.moveBy}
        onMoveToSet={builder.moveToSet}
        onRemove={builder.removeExercise}
      />

      <Dialog
        id="clear-set"
        open={builder.clearing}
        onClose={builder.cancelClearSet}
        title={t('hiit.builder.clearSet.title', {
          set: t('hiit.builder.setTitle', { n: builder.currentSetIndex + 1 }),
        })}
      >
        <p>{t('hiit.builder.clearSet.body')}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={builder.cancelClearSet}>
            {t('action.cancel')}
          </Button>
          <Button variant="danger" onClick={builder.confirmClearSet}>
            {t('hiit.builder.clearSet')}
          </Button>
        </div>
      </Dialog>
    </MotionConfig>
  );
}
