import { Reorder, useDragControls } from 'motion/react';
import { IconButton } from '@/components/ui/IconButton';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import type { MuscleIconName } from '@/lib/muscle-icon';
import { ArrowDownIcon, ArrowUpIcon, GripIcon } from '@/components/gym/gym-icons';

interface EntryRowProps {
  id: string;
  name: string;
  prescription: string;
  tempo?: string | undefined;
  notes?: string | undefined;
  optionalLabel: string | null;
  icon: MuscleIconName;
  restLabel?: string | undefined;
  dragLabel: string;
  editLabel: string;
  moveUpLabel: string;
  moveDownLabel: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function EntryRow({
  id,
  name,
  prescription,
  tempo,
  notes,
  optionalLabel,
  icon,
  restLabel,
  dragLabel,
  editLabel,
  moveUpLabel,
  moveDownLabel,
  canMoveUp,
  canMoveDown,
  onEdit,
  onMoveUp,
  onMoveDown,
}: EntryRowProps) {
  const controls = useDragControls();
  const details = [prescription, tempo, restLabel].filter((part): part is string => Boolean(part));
  return (
    <Reorder.Item
      value={id}
      as="li"
      dragListener={false}
      dragControls={controls}
      whileDrag={{ boxShadow: 'var(--shadow-lift)', scale: 1.01 }}
      className="flex items-stretch gap-1 border-b border-paper-dim bg-white last:border-b-0"
    >
      <button
        type="button"
        aria-label={dragLabel}
        onPointerDown={(event) => controls.start(event)}
        className="grid w-9 shrink-0 cursor-grab touch-none place-items-center text-ink-soft hover:text-ink active:cursor-grabbing"
      >
        <GripIcon />
      </button>
      <button
        type="button"
        onClick={onEdit}
        aria-label={`${editLabel}: ${name}`}
        className="flex min-w-0 flex-1 items-center gap-3 py-3 pr-2 text-left hover:bg-paper-dim/40"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper-dim text-brand">
          <MuscleIcon name={icon} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-display text-3 font-semibold leading-tight">{name}</span>
            {optionalLabel ? <span className="pill h-6 text-1">{optionalLabel}</span> : null}
          </span>
          <span className="mt-0.5 block text-2 font-bold text-ink">{details.join(', ')}</span>
          {notes ? <span className="block text-1 text-ink-soft">{notes}</span> : null}
        </span>
      </button>
      <div className="flex flex-col justify-center">
        <IconButton label={moveUpLabel} onClick={onMoveUp} disabled={!canMoveUp} className="size-9">
          <ArrowUpIcon size={18} />
        </IconButton>
        <IconButton
          label={moveDownLabel}
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="size-9"
        >
          <ArrowDownIcon size={18} />
        </IconButton>
      </div>
    </Reorder.Item>
  );
}
