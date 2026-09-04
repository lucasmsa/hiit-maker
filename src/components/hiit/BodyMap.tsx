import { bodyBack, bodyFront, muscleOverlays, type Artwork } from '@/assets/original-art';
import { useT } from '@/hooks/useT';
import { regionFills, type BodyRegion, type RegionFill } from '@/lib/body-map';
import { groupName } from '@/lib/hiit-summary';
import type { HiitGroup } from '@/lib/types';

interface BodyMapProps {
  counts: Partial<Record<HiitGroup, number>>;
}

const overlayStyle = { transition: 'fill-opacity 300ms ease' };

function Silhouette({ art, className }: { art: Artwork; className: string }) {
  return (
    <>
      {art.paths.map((d, index) => (
        <path key={index} d={d} className={className} />
      ))}
    </>
  );
}

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

function fillFor(fills: RegionFill[], region: BodyRegion): RegionFill {
  return fills.find((fill) => fill.region === region) ?? { region, count: 0, opacity: 0 };
}

function FrontBody({ fills }: { fills: RegionFill[] }) {
  const shoulders = fillFor(fills, 'shoulders');
  const arms = fillFor(fills, 'arms');
  return (
    <svg viewBox={bodyFront.viewBox} className="h-52 w-auto" aria-hidden="true" focusable="false">
      <Silhouette art={bodyFront} className="fill-ink" />
      <Overlay art={muscleOverlays.chest} transform="translate(12.65 36.5)" fill={fillFor(fills, 'chest')} />
      <Overlay art={muscleOverlays.core} transform="translate(15.65 50)" fill={fillFor(fills, 'core')} />
      <Overlay art={muscleOverlays.legs} transform="translate(12.6 70) scale(0.95)" fill={fillFor(fills, 'legs')} />
      <g
        data-region="shoulders"
        data-count={shoulders.count}
        fill="var(--color-go)"
        fillOpacity={shoulders.opacity}
        style={overlayStyle}
      >
        <ellipse cx="6.2" cy="29.5" rx="4.4" ry="3" />
        <ellipse cx="42.1" cy="29.5" rx="4.4" ry="3" />
      </g>
      <g data-region="arms" data-count={arms.count} fill="var(--color-go)" fillOpacity={arms.opacity} style={overlayStyle}>
        <rect x="1.7" y="37" width="5.9" height="27" rx="2.95" />
        <rect x="40.7" y="37" width="5.9" height="27" rx="2.95" />
      </g>
    </svg>
  );
}

function BackBody({ fills }: { fills: RegionFill[] }) {
  return (
    <svg viewBox={bodyBack.viewBox} className="h-28 w-auto" aria-hidden="true" focusable="false">
      <Silhouette art={bodyBack} className="fill-ink" />
      <Overlay art={muscleOverlays.back} transform="translate(26.75 26) scale(0.78)" fill={fillFor(fills, 'back')} />
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
        <figure className="flex flex-col items-center gap-1 pt-6">
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
