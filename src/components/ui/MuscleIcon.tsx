import { muscleIconBodies, muscleIconViewBox } from '@/assets/muscle-icons';
import type { MuscleIconName } from '@/lib/muscle-icon';

interface MuscleIconProps {
  name: MuscleIconName;
  size?: 16 | 24 | 48;
  className?: string;
}

export function MuscleIcon({ name, size = 24, className }: MuscleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={muscleIconViewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      dangerouslySetInnerHTML={{ __html: muscleIconBodies[name] }}
    />
  );
}
