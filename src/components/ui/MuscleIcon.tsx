import type { MuscleIconName } from '@/lib/muscle-icon';

interface MuscleIconProps {
  name: MuscleIconName;
  size?: 24 | 48;
  className?: string;
}

const paths: Record<MuscleIconName, React.ReactNode> = {
  chest: (
    <>
      <path d="M3 9c2.5-2.6 6.5-2.6 9 0 2.5-2.6 6.5-2.6 9 0" />
      <path d="M3 9c0 5 4 8 9 7.5 5 .5 9-2.5 9-7.5" />
      <path d="M12 9v7.5" />
    </>
  ),
  back: (
    <>
      <path d="M4 4h16" />
      <path d="M5.5 4l.7 7.5L12 21l5.8-9.5.7-7.5" />
      <path d="M12 4v17" />
    </>
  ),
  legs: (
    <>
      <path d="M7 3h4v7.5L10 21H7.5l-.8-10z" />
      <path d="M13 3h4l.3 8-.8 10H14l-1-10.5z" />
    </>
  ),
  core: (
    <>
      <rect x="4.5" y="3" width="6" height="5" rx="1.5" />
      <rect x="13.5" y="3" width="6" height="5" rx="1.5" />
      <rect x="4.5" y="9.5" width="6" height="5" rx="1.5" />
      <rect x="13.5" y="9.5" width="6" height="5" rx="1.5" />
      <rect x="4.5" y="16" width="6" height="5" rx="1.5" />
      <rect x="13.5" y="16" width="6" height="5" rx="1.5" />
    </>
  ),
  shoulders: (
    <>
      <path d="M2.5 12c0-4.5 3.5-7 7-7h5c3.5 0 7 2.5 7 7" />
      <path d="M2.5 12v8M21.5 12v8" />
      <path d="M9.5 5v5M14.5 5v5" />
    </>
  ),
  arms: (
    <>
      <circle cx="17" cy="5" r="2.5" />
      <path d="M15.2 6.8 11 12" />
      <path d="M18.8 6.8 15.5 11.6" />
      <path d="M11 12c-4.5 0-8 3.5-8 8.5" />
      <path d="M15.5 11.6c3.5 1 5.5 4 5.5 8.9" />
      <path d="M3 20.5h18" />
    </>
  ),
  cardio: (
    <>
      <path d="M12 21s-8-5.2-8-11a4 4 0 0 1 8-1.8A4 4 0 0 1 20 10c0 5.8-8 11-8 11z" />
      <path d="M6 12h3l1.5-3 3 6 1.5-3H18" />
    </>
  ),
};

export function MuscleIcon({ name, size = 24, className }: MuscleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={size === 48 ? 1.5 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
