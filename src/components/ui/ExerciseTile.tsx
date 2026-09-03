import type { HiitGroup } from '@/lib/types';
import { useImageFallback } from '@/hooks/useImageFallback';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { cx } from '@/lib/cx';

interface ExerciseTileProps {
  name: string;
  photo: string;
  group: HiitGroup;
  placed?: boolean;
  onSelect?: () => void;
  sizes?: string;
  className?: string;
}

export function ExerciseTile({
  name,
  photo,
  group,
  placed = false,
  onSelect,
  sizes = '(min-width: 1024px) 220px, 44vw',
  className,
}: ExerciseTileProps) {
  const { failed, onError } = useImageFallback(photo);
  const body = (
    <>
      <span className="tile-photo">
        {failed ? (
          <span className="tile-fallback">
            <MuscleIcon name={group} size={48} />
          </span>
        ) : (
          <img
            src={`/exercises/${photo}-480.webp`}
            srcSet={`/exercises/${photo}-480.webp 480w, /exercises/${photo}-960.webp 960w`}
            sizes={sizes}
            alt={name}
            loading="lazy"
            decoding="async"
            onError={onError}
          />
        )}
      </span>
      <span className="tile-caption">{name}</span>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" className={cx('tile', className)} data-placed={placed} onClick={onSelect}>
        {body}
      </button>
    );
  }
  return (
    <div className={cx('tile', className)} data-placed={placed}>
      {body}
    </div>
  );
}
