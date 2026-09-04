import type { HiitGroup } from '@/lib/types';
import { useImageFallback } from '@/hooks/useImageFallback';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { cx } from '@/lib/cx';

interface ExerciseTileProps {
  name: string;
  photo: string;
  group: HiitGroup;
  placed?: boolean;
  caption?: boolean;
  onSelect?: () => void;
  unavailable?: boolean;
  sizes?: string;
  eager?: boolean;
  className?: string;
}

export function ExerciseTile({
  name,
  photo,
  group,
  placed = false,
  caption = true,
  onSelect,
  unavailable = false,
  sizes = '(min-width: 1024px) 120px, 40vw',
  eager = false,
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
            alt={caption ? '' : name}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onError={onError}
          />
        )}
      </span>
      {caption && <span className="tile-caption">{name}</span>}
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        className={cx('tile', className)}
        data-placed={placed}
        data-caption="hover"
        onClick={unavailable ? undefined : onSelect}
        aria-disabled={unavailable || undefined}
        data-unavailable={unavailable || undefined}
      >
        {body}
      </button>
    );
  }
  return (
    <div className={cx('tile', className)} data-placed={placed} data-caption="always">
      {body}
    </div>
  );
}
