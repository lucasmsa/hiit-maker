import { bodyBack, bodyFront, muscleOverlays, type Artwork } from '@/assets/original-art';
import { useT } from '@/hooks/useT';
import { regionFills, type BodyRegion, type RegionFill } from '@/lib/body-map';
import { groupName } from '@/lib/hiit-summary';
import type { HiitGroup } from '@/lib/types';

interface BodyMapProps {
  counts: Partial<Record<HiitGroup, number>>;
}

const overlayStyle = { transition: 'fill-opacity 300ms ease' };
const ink = 'var(--color-ink)';

function Overlay({ art, transform, fill }: { art: Artwork; transform: string; fill: RegionFill }) {
  return (
    <g
      transform={transform}
      data-region={fill.region}
      data-count={fill.count}
      fill="var(--color-go)"
      fillOpacity={fill.opacity}
      style={overlayStyle}
    >
      {art.paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </g>
  );
}

function Region({ fill, children }: { fill: RegionFill; children: React.ReactNode }) {
  return (
    <g
      data-region={fill.region}
      data-count={fill.count}
      fill="var(--color-go)"
      fillOpacity={fill.opacity}
      style={overlayStyle}
    >
      {children}
    </g>
  );
}

function fillFor(fills: RegionFill[], region: BodyRegion): RegionFill {
  return fills.find((fill) => fill.region === region) ?? { region, count: 0, opacity: 0 };
}

function FrontBody({ fills }: { fills: RegionFill[] }) {
  return (
    <svg viewBox={bodyFront.viewBox} className="h-52 w-auto" aria-hidden="true" focusable="false">
      {bodyFront.paths.map((d, index) => (
        <path key={index} d={d} fill={ink} />
      ))}
      <Region fill={fillFor(fills, 'shoulders')}>
        <ellipse cx="6.8" cy="27.8" rx="4.6" ry="5.2" />
        <ellipse cx="41.51" cy="27.8" rx="4.6" ry="5.2" />
      </Region>
      <Region fill={fillFor(fills, 'arms')}>
        <rect x="1.6" y="37" width="6.08" height="29" rx="3.04" />
        <rect x="40.63" y="37" width="6.08" height="29" rx="3.04" />
      </Region>
      <Overlay art={muscleOverlays.chest} transform="translate(12.83 30.5)" fill={fillFor(fills, 'chest')} />
      <Overlay art={muscleOverlays.core} transform="translate(15.5 47.5)" fill={fillFor(fills, 'core')} />
      <Overlay art={muscleOverlays.legs} transform="translate(12.15 68.75)" fill={fillFor(fills, 'legs')} />
    </svg>
  );
}

function BackBody({ fills }: { fills: RegionFill[] }) {
  return (
    <svg viewBox={bodyBack.viewBox} className="h-34 w-auto" aria-hidden="true" focusable="false">
      {bodyBack.shapes.map((shape, index) =>
        shape.stroke ? (
          <path
            key={index}
            d={shape.d}
            fill={ink}
            stroke={ink}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        ) : (
          <path key={index} d={shape.d} fill={ink} />
        )
      )}
      <Overlay
        art={muscleOverlays.back}
        transform="translate(24.7 22.5) scale(0.9)"
        fill={fillFor(fills, 'back')}
      />
    </svg>
  );
}

function CardioMark({ count }: { count: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-5 w-5"
      aria-hidden="true"
      focusable="false"
      data-region="cardio"
      data-count={count}
      fill="var(--color-go)"
      fillOpacity={count > 0 ? 1 : 0}
      style={overlayStyle}
    >
      <path d="M8 14.4S1.2 10.4 1.2 5.9A3.6 3.6 0 0 1 8 4.4a3.6 3.6 0 0 1 6.8 1.5c0 4.5-6.8 8.5-6.8 8.5z" />
    </svg>
  );
}

export function BodyMap({ counts }: BodyMapProps) {
  const t = useT();
  const fills = regionFills(counts);
  const listed = (Object.keys(counts) as HiitGroup[]).filter((group) => (counts[group] ?? 0) > 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-center gap-8">
        <figure className="flex flex-col items-center gap-1">
          <FrontBody fills={fills} />
          <figcaption className="text-1 font-bold text-ink-soft">{t('hiit.builder.bodyFront')}</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-1">
          <BackBody fills={fills} />
          <figcaption className="text-1 font-bold text-ink-soft">{t('hiit.builder.bodyBack')}</figcaption>
          <CardioMark count={counts.cardio ?? 0} />
        </figure>
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
