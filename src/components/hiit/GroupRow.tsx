import { ExerciseTile } from '@/components/ui/ExerciseTile';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/hiit/HiitIcons';
import { useHorizontalScroller } from '@/hooks/useHorizontalScroller';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';
import { exerciseName, groupName } from '@/lib/hiit-summary';
import type { HiitExercise, HiitGroup } from '@/lib/types';

interface GroupRowProps {
  group: HiitGroup;
  exercises: HiitExercise[];
  placedIds: Set<string>;
  onSelect: (exerciseId: string) => void;
  onRail: boolean;
}

export function GroupRow({ group, exercises, placedIds, onSelect, onRail }: GroupRowProps) {
  const t = useT();
  const { ref, scrollLeft, scrollRight, onScroll, atStart, atEnd } = useHorizontalScroller();
  const name = groupName(group, t);
  return (
    <section className="flex flex-col gap-2" aria-label={name}>
      <h3 className="rail-heading" data-on-rail={onRail}>
        <MuscleIcon name={group} size={24} />
        {name}
      </h3>
      <div className="relative" data-rail={onRail}>
        <div
          ref={ref}
          onScroll={onScroll}
          className="no-scrollbar -mx-1 flex min-h-[6rem] snap-x snap-mandatory gap-3 overflow-x-auto px-1 py-1"
        >
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={cx('shrink-0 snap-start', onRail ? 'w-[5.5rem]' : 'w-[8.5rem]')}
            >
              <ExerciseTile
                name={exerciseName({ kind: 'catalog', exerciseId: exercise.id }, t)}
                photo={exercise.photo}
                group={exercise.group}
                placed={placedIds.has(exercise.id)}
                onSelect={() => onSelect(exercise.id)}
                sizes={onRail ? '88px' : '136px'}
                eager={onRail}
              />
            </div>
          ))}
        </div>
        {!atStart && (
          <button
            type="button"
            className="rail-chevron"
            data-side="left"
            aria-label={t('hiit.builder.scrollLeft', { group: name })}
            onClick={scrollLeft}
          >
            <ChevronLeftIcon />
          </button>
        )}
        {!atEnd && (
          <button
            type="button"
            className="rail-chevron"
            data-side="right"
            aria-label={t('hiit.builder.scrollRight', { group: name })}
            onClick={scrollRight}
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </section>
  );
}
