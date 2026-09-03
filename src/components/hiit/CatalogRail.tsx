import { Field, TextInput } from '@/components/ui/Field';
import { GroupRow } from '@/components/hiit/GroupRow';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';
import type { HiitExercise, HiitGroup } from '@/lib/types';

interface CatalogRailProps {
  id: string;
  query: string;
  onQueryChange: (query: string) => void;
  groups: Array<{ group: HiitGroup; exercises: HiitExercise[] }>;
  placedIds: Set<string>;
  onSelect: (exerciseId: string) => void;
  onRail: boolean;
}

export function CatalogRail({ id, query, onQueryChange, groups, placedIds, onSelect, onRail }: CatalogRailProps) {
  const t = useT();
  return (
    <div className={cx('flex flex-col gap-6', onRail && '[&_label]:text-white')}>
      <Field id={`${id}-search`} label={t('label.search')}>
        <TextInput
          id={`${id}-search`}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
          className={cx(onRail && 'border-transparent')}
        />
      </Field>
      {groups.length === 0 ? (
        <p className={cx('font-bold', onRail ? 'text-white' : 'text-ink')}>
          {t('hiit.builder.noMatches', { query })}
        </p>
      ) : (
        groups.map(({ group, exercises }) => (
          <GroupRow
            key={group}
            group={group}
            exercises={exercises}
            placedIds={placedIds}
            onSelect={onSelect}
            onRail={onRail}
          />
        ))
      )}
    </div>
  );
}
