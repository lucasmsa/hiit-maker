import { Fragment } from 'react';
import {
  AddSetIcon,
  RemoveSetIcon,
  SelectedSetDot,
  UnselectedSetDot,
} from '@/components/hiit/OriginalIcons';
import { useT } from '@/hooks/useT';
import { MAX_SETS } from '@/lib/workout-limits';
import { cx } from '@/lib/cx';

interface SetStepperProps {
  count: number;
  currentIndex: number;
  orientation: 'vertical' | 'horizontal';
  onSelect: (index: number) => void;
  onAdd: () => void;
  onRemove: () => void;
  className?: string;
}

export function SetStepper({
  count,
  currentIndex,
  orientation,
  onSelect,
  onAdd,
  onRemove,
  className,
}: SetStepperProps) {
  const t = useT();
  const indexes = Array.from({ length: count }, (_, index) => index);
  return (
    <div
      className={cx('stepper', className)}
      data-orientation={orientation}
      role="group"
      aria-label={t('hiit.builder.setsLabel')}
    >
      <span className="text-ink-soft">
        {t('hiit.builder.setsLabel')}: <span className="text-brand">{count}</span>
        <span className="text-ink-soft">/{MAX_SETS}</span>
      </span>
      <div className="stepper-dots">
        {indexes.map((index) => (
          <Fragment key={index}>
            <button
              type="button"
              className="stepper-dot"
              aria-label={t('hiit.builder.setTitle', { n: index + 1 })}
              aria-current={index === currentIndex ? 'true' : undefined}
              onClick={() => onSelect(index)}
            >
              {index === currentIndex ? <SelectedSetDot /> : <UnselectedSetDot />}
            </button>
          </Fragment>
        ))}
      </div>
      <div className="stepper-actions">
        <button
          type="button"
          className="stepper-action"
          data-tone="go"
          onClick={onAdd}
          disabled={count >= MAX_SETS}
        >
          <AddSetIcon />
          {t('hiit.builder.addSet')}
        </button>
        <button
          type="button"
          className="stepper-action"
          data-tone="brand"
          onClick={onRemove}
          disabled={count <= 1}
        >
          <RemoveSetIcon />
          {t('hiit.builder.removeSet')}
        </button>
      </div>
    </div>
  );
}
