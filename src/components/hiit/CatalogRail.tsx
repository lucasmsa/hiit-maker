import { GroupRow } from '@/components/hiit/GroupRow';
import { SearchIcon } from '@/components/hiit/OriginalIcons';
import { useT } from '@/hooks/useT';
import { cx } from '@/lib/cx';
import type { HiitExercise, HiitGroup } from '@/lib/types';

export interface CatalogRailProps {
  id: string;
  query: string;
  onQueryChange: (query: string) => void;
  groups: Array<{ group: HiitGroup; exercises: HiitExercise[] }>;
  placedIds: Set<string>;
  setFull: boolean;
  onSelect: (exerciseId: string) => void;
  onRail: boolean;
}

export function CatalogRail({
  id,
  query,
  onQueryChange,
  groups,
  placedIds,
  setFull,
  onSelect,
  onRail,
}: CatalogRailProps) {
  const t = useT();
  return (
    <div className="catalog-rail flex flex-col gap-6">
      <div className="search-pill" data-on-rail={onRail}>
        <label htmlFor={`${id}-search`} className="sr-only">
          {t('label.search')}
        </label>
        <SearchIcon size={16} />
        <input
          id={`${id}-search`}
          type="search"
          value={query}
          placeholder={t('label.search')}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
        />
      </div>
      {groups.length === 0 ? (
        <p className={cx('text-1 font-bold', onRail ? 'text-white' : 'text-ink')}>
          {t('hiit.builder.noMatches', { query })}
        </p>
      ) : (
        groups.map(({ group, exercises }) => (
          <GroupRow
            key={group}
            group={group}
            exercises={exercises}
            placedIds={placedIds}
            setFull={setFull}
            onSelect={onSelect}
            onRail={onRail}
          />
        ))
      )}
    </div>
  );
}
