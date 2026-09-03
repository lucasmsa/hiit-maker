import { ExerciseTile } from '@/components/ui/ExerciseTile';
import { IconButton } from '@/components/ui/IconButton';
import { LaneChip } from '@/components/ui/LaneChip';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/hiit/HiitIcons';
import { useHorizontalScroller } from '@/hooks/useHorizontalScroller';
import { useT } from '@/hooks/useT';
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
  const { ref, scrollLeft, scrollRight } = useHorizontalScroller();
  const name = groupName(group, t);
  return (
    <section className="flex flex-col gap-2" aria-label={name}>
      <div className="flex items-center justify-between gap-2">
        <LaneChip size="sm" tone={onRail ? 'ink' : 'brand'} icon={<MuscleIcon name={group} />}>
          {name}
        </LaneChip>
        <div className="flex">
          <IconButton
            label={t('hiit.builder.scrollLeft', { group: name })}
            tone={onRail ? 'inverse' : 'ink'}
            onClick={scrollLeft}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            label={t('hiit.builder.scrollRight', { group: name })}
            tone={onRail ? 'inverse' : 'ink'}
            onClick={scrollRight}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
      <div
        ref={ref}
        className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]"
      >
        {exercises.map((exercise) => (
          <div key={exercise.id} className="w-[200px] shrink-0 snap-start">
            <ExerciseTile
              name={exerciseName({ kind: 'catalog', exerciseId: exercise.id }, t)}
              photo={exercise.photo}
              group={exercise.group}
              placed={placedIds.has(exercise.id)}
              onSelect={() => onSelect(exercise.id)}
              sizes="200px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
