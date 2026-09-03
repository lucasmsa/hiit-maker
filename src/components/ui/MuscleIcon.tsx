import { muscleIconArt, type Artwork } from '@/assets/original-art';
import type { MuscleIconName } from '@/lib/muscle-icon';
import { fitTransform } from '@/lib/svg-fit';

interface MuscleIconProps {
  name: MuscleIconName;
  size?: 16 | 24 | 48;
  className?: string;
}

const originals: Partial<Record<MuscleIconName, Artwork>> = {
  chest: muscleIconArt.chest,
  legs: muscleIconArt.legs,
  back: muscleIconArt.back,
  core: muscleIconArt.core,
};

const drawn: Partial<Record<MuscleIconName, React.ReactNode>> = {
  shoulders: (
    <>
      <circle cx="8" cy="2.2" r="1.8" />
      <path d="M0.4 9.2c0-3 2.3-5.4 5.3-5.6l1.5-.1v4.2c0 .8-.7 1.5-1.5 1.5H0.4z" />
      <path d="M15.6 9.2c0-3-2.3-5.4-5.3-5.6l-1.5-.1v4.2c0 .8.7 1.5 1.5 1.5h5.3z" />
      <path d="M5.6 10.4h4.8v3.9c0 .6-.5 1.1-1.1 1.1H6.7c-.6 0-1.1-.5-1.1-1.1z" />
    </>
  ),
  arms: (
    <path d="M10.4 1.2H14a1.4 1.4 0 0 1 1.4 1.4v2.3a1 1 0 0 1-.8 1V13a1.6 1.6 0 0 1-1.6 1.6H2.6A1.6 1.6 0 0 1 1 13v-3c0-3.3 2.2-5.6 4.9-5.6 2.7 0 4.7 2.3 4.7 5.6V5.9a1 1 0 0 1-1-1V2.6a1.4 1.4 0 0 1 .8-1.4z" />
  ),
  cardio: (
    <>
      <path
        d="M8 14.1S1.7 10.3 1.7 6a3.3 3.3 0 0 1 6.3-1.4A3.3 3.3 0 0 1 14.3 6c0 4.3-6.3 8.1-6.3 8.1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M3.7 8h2.1l1.1-2 1.9 4 1.1-2h2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export function MuscleIcon({ name, size = 24, className }: MuscleIconProps) {
  const original = originals[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {original ? (
        <g transform={fitTransform(original.viewBox, 16)}>
          {original.paths.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
      ) : (
        drawn[name]
      )}
    </svg>
  );
}
