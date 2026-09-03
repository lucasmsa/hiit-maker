import { Reorder, useDragControls } from 'motion/react';
import { IconButton } from '@/components/ui/IconButton';
import { LaneChip } from '@/components/ui/LaneChip';
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
      className="flex items-stretch gap-1 rounded-button bg-white"
    >
      <button
        type="button"
        aria-label={dragLabel}
        onPointerDown={(event) => controls.start(event)}
        className="grid w-9 shrink-0 cursor-grab touch-none place-items-center rounded-l-button text-ink-soft hover:bg-ink/5 active:cursor-grabbing"
      >
        <GripIcon />
      </button>
      <button
        type="button"
        onClick={onEdit}
        aria-label={`${editLabel}: ${name}`}
        className="flex min-w-0 flex-1 items-center gap-3 py-3 pr-2 text-left hover:bg-ink/5"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-deep">
          <MuscleIcon name={icon} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-4 font-extrabold leading-none">{name}</span>
            {optionalLabel ? (
              <LaneChip size="sm" tone="soft" className="text-1">
                {optionalLabel}
              </LaneChip>
            ) : null}
          </span>
          <span className="mt-1 block text-2 font-bold text-ink">{details.join(', ')}</span>
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
