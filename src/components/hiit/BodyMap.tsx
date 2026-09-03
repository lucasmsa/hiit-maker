import { useT } from '@/hooks/useT';
import { regionFills, type BodyRegion, type RegionFill } from '@/lib/body-map';
import { groupName } from '@/lib/hiit-summary';
import type { HiitGroup } from '@/lib/types';

interface BodyMapProps {
  counts: Partial<Record<HiitGroup, number>>;
}

const frontRegions: Record<BodyRegion, string | null> = {
  shoulders: 'M32 46 L18 52 L26 70 L36 62 Z M88 46 L102 52 L94 70 L84 62 Z',
  chest: 'M36 62 H84 L82 92 Q60 102 38 92 Z',
  core: 'M40 96 H80 L82 140 H38 Z',
  arms: 'M24 72 L10 110 L12 142 H24 L26 112 L35 98 Z M96 72 L110 110 L108 142 H96 L94 112 L85 98 Z',
  back: null,
  legs: 'M38 142 L34 200 L36 250 H52 L56 200 L59 144 Z M82 142 L86 200 L84 250 H68 L64 200 L61 144 Z',
};

const backRegions: Record<BodyRegion, string | null> = {
  shoulders: frontRegions.shoulders,
  chest: null,
  core: null,
  arms: frontRegions.arms,
  back: 'M36 62 H84 L82 140 H38 Z',
  legs: frontRegions.legs,
};

const silhouette =
  'M60 5a15 15 0 1 1 0 30a15 15 0 1 1 0-30 M54 34h12v10H54z M32 46 H88 L84 96 L82 140 H38 L36 96 Z M32 46 L18 52 L10 110 L12 142 H24 L26 112 L36 96 M88 46 L102 52 L110 110 L108 142 H96 L94 112 L84 96 M38 140 L34 200 L36 250 H52 L56 200 L59 142 M82 140 L86 200 L84 250 H68 L64 200 L61 142';

function Body({ regions, fills, label }: { regions: Record<BodyRegion, string | null>; fills: RegionFill[]; label: string }) {
  return (
    <figure className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 120 260" className="h-56 w-auto" aria-hidden="true" focusable="false">
        <path d={silhouette} fill="none" stroke="var(--color-ink)" strokeWidth={1.5} strokeLinejoin="round" />
        {fills.map((fill) => {
          const path = regions[fill.region];
          if (!path) {
            return null;
          }
          return (
            <path
              key={fill.region}
              d={path}
              data-region={fill.region}
              data-count={fill.count}
              fill={fill.count > 0 ? 'var(--color-brand)' : 'none'}
              fillOpacity={fill.opacity}
              stroke={fill.count > 0 ? 'var(--color-brand-deep)' : 'var(--color-ink-soft)'}
              strokeWidth={1}
              strokeDasharray={fill.count > 0 ? undefined : '3 3'}
              style={{ transition: 'fill-opacity 250ms ease' }}
            />
          );
        })}
      </svg>
      <figcaption className="text-1 font-bold text-ink-soft">{label}</figcaption>
    </figure>
  );
}

export function BodyMap({ counts }: BodyMapProps) {
  const t = useT();
  const fills = regionFills(counts);
  const listed = (Object.keys(counts) as HiitGroup[]).filter((group) => (counts[group] ?? 0) > 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center gap-6">
        <Body regions={frontRegions} fills={fills} label={t('hiit.builder.bodyFront')} />
        <Body regions={backRegions} fills={fills} label={t('hiit.builder.bodyBack')} />
      </div>
      {listed.length > 0 ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-1 font-bold text-ink-soft" aria-label={t('label.targetMuscles')}>
          {listed.map((group) => (
            <li key={group}>
              {groupName(group, t)} <span className="text-ink">{counts[group]}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-1 text-ink-soft">{t('hiit.builder.noMuscles')}</p>
      )}
    </div>
  );
}
