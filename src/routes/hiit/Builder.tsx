import type { CSSProperties } from 'react';
import { MotionConfig } from 'motion/react';
import { Link, useParams } from 'react-router';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@/components/ui/Dialog';
import { Digits } from '@/components/ui/Digits';
import { NumberField, TextInput } from '@/components/ui/Field';
import { ArrowLeftIcon } from '@/components/ui/icons';
import { CatalogRail } from '@/components/hiit/CatalogRail';
import { LinkIcon, PlayIcon } from '@/components/hiit/HiitIcons';
import { LinkButton } from '@/components/hiit/LinkButton';
import { SetEditor } from '@/components/hiit/SetEditor';
import { WorkoutSummary } from '@/components/hiit/WorkoutSummary';
import { useBuilder } from '@/hooks/useBuilder';
import { useT } from '@/hooks/useT';
import { formatClock } from '@/lib/digits';

const barDigits = { '--digits-size': 'var(--text-6)' } as CSSProperties;

export function HiitBuilder() {
  const { id } = useParams();
  const t = useT();
  const builder = useBuilder(id);
  const { workout, summary } = builder;

  if (!workout || !summary) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-3">{t('hiit.builder.notFound')}</p>
        <LinkButton to="/hiit" variant="secondary" className="mt-6">
          {t('hiit.builder.back')}
        </LinkButton>
      </main>
    );
  }

  const canStart = summary.exerciseCount > 0;

  return (
    <MotionConfig reducedMotion="user">
      <div className="lg:grid lg:h-[calc(100dvh-4rem)] lg:grid-cols-[320px_minmax(0,1fr)_360px]">
        <aside
          className="hidden overflow-y-auto bg-brand px-4 py-6 text-white lg:block"
          aria-label={t('hiit.builder.catalog')}
        >
          <CatalogRail
            id="rail"
            query={builder.query}
            onQueryChange={builder.setQuery}
            groups={builder.catalog}
            placedIds={builder.placedIds}
            onSelect={builder.addFromCatalog}
            onRail
          />
        </aside>

        <main className="min-w-0 px-4 pb-32 pt-6 sm:px-8 lg:overflow-y-auto lg:pb-10">
          <Link to="/hiit" className="inline-flex items-center gap-1 font-bold text-ink-soft hover:text-ink">
            <ArrowLeftIcon size={20} />
            {t('hiit.builder.back')}
          </Link>

          <div className="mt-4 flex flex-wrap items-end gap-4">
            <div className="flex min-w-[16rem] flex-1 flex-col gap-1.5">
              <label htmlFor="workout-name" className="text-1 font-bold text-ink-soft">
                {t('hiit.builder.name')}
              </label>
              <TextInput
                id="workout-name"
                value={workout.name}
                onChange={(event) => builder.rename(event.target.value)}
                maxLength={60}
                className="h-14 font-display text-6 font-extrabold"
              />
            </div>
            <NumberField
              id="workout-warmup"
              label={t('label.warmup')}
              value={workout.warmupSeconds}
              onChange={builder.setWarmup}
              min={0}
              max={600}
              step={15}
              unit={t('label.seconds')}
              className="w-56"
            />
            <Button variant="ghost" onClick={builder.share.copy} disabled={!canStart} className="lg:hidden">
              <LinkIcon />
              {builder.share.state === 'copied' ? t('share.copied') : t('hiit.builder.shareLink')}
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {workout.sets.map((set, index) => (
              <SetEditor
                key={set.id}
                set={set}
                index={index}
                allSets={workout.sets}
                isCurrent={builder.currentSetId === set.id}
                flashId={builder.flashId}
                onSelect={() => builder.selectSet(set.id)}
                onLoops={(loops) => builder.setLoops(set.id, loops)}
                onSetRest={(seconds) => builder.setSetRest(set.id, seconds)}
                onRemoveSet={() => builder.removeSet(set.id)}
                onAddExercise={() => builder.openSheetFor(set.id)}
                onTrain={(placedId, seconds) => builder.setTrain(set.id, placedId, seconds)}
                onRest={(placedId, seconds) => builder.setRest(set.id, placedId, seconds)}
                onRemoveExercise={(placedId) => builder.removeExercise(set.id, placedId)}
                onReorder={(orderedIds) => builder.reorder(set.id, orderedIds)}
                onMoveBy={(placedId, delta) => builder.moveBy(set.id, placedId, delta)}
                onMoveToSet={(placedId, toSetId) => builder.moveToSet(set.id, placedId, toSetId)}
              />
            ))}
            <Button variant="secondary" onClick={builder.addSet} className="self-start">
              {t('hiit.builder.addSet')}
            </Button>
          </div>
        </main>

        <aside className="hidden overflow-y-auto border-l border-ink/10 px-6 py-6 lg:block">
          <WorkoutSummary workoutId={workout.id} summary={summary} counts={builder.counts} share={builder.share} />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 border-t border-ink/10 bg-chalk/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex flex-col">
          <span className="text-1 font-bold text-ink-soft">{t('label.totalTime')}</span>
          <Digits
            value={formatClock(summary.totalSeconds * 1000)}
            label={t('label.totalTime')}
            className="text-brand-deep"
            style={barDigits}
          />
        </div>
        {canStart ? (
          <LinkButton to={`/hiit/${workout.id}/run`} size="lg">
            <PlayIcon />
            {t('hiit.builder.start')}
          </LinkButton>
        ) : (
          <Button size="lg" disabled>
            <PlayIcon />
            {t('hiit.builder.start')}
          </Button>
        )}
      </div>

      <BottomSheet
        id="catalog-sheet"
        open={builder.sheetOpen}
        onClose={builder.closeSheet}
        title={t('hiit.builder.catalog')}
      >
        {builder.sheetOpen ? (
          <CatalogRail
            id="sheet"
            query={builder.query}
            onQueryChange={builder.setQuery}
            groups={builder.catalog}
            placedIds={builder.placedIds}
            onSelect={builder.addFromCatalog}
            onRail={false}
          />
        ) : null}
      </BottomSheet>
    </MotionConfig>
  );
}
