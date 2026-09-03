import type { KeyboardEvent, ReactNode } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { LaneChip } from '@/components/ui/LaneChip';
import { TextInput } from '@/components/ui/Field';
import { useFocusOnMount } from '@/hooks/useFocusOnMount';
import { ArrowDownIcon, ArrowUpIcon, PencilIcon, TrashIcon } from '@/components/gym/gym-icons';

interface DaySectionProps {
  name: string;
  notes?: string | undefined;
  renaming: boolean;
  renameValue: string;
  renameLabel: string;
  moveUpLabel: string;
  moveDownLabel: string;
  removeLabel: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  canRemove: boolean;
  onRename: () => void;
  onRenameChange: (value: string) => void;
  onRenameCommit: () => void;
  onRenameCancel: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  children: ReactNode;
}

export function DaySection({
  name,
  notes,
  renaming,
  renameValue,
  renameLabel,
  moveUpLabel,
  moveDownLabel,
  removeLabel,
  canMoveUp,
  canMoveDown,
  canRemove,
  onRename,
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}: DaySectionProps) {
  const focusOnMount = useFocusOnMount();
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onRenameCommit();
    } else if (event.key === 'Escape') {
      onRenameCancel();
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-wrap items-center gap-2">
        {renaming ? (
          <span ref={focusOnMount} className="contents">
            <TextInput
              aria-label={renameLabel}
              value={renameValue}
              onChange={(event) => onRenameChange(event.target.value)}
              onBlur={onRenameCommit}
              onKeyDown={onKeyDown}
              className="max-w-xs font-display text-4 font-extrabold"
            />
          </span>
        ) : (
          <h2>
            <LaneChip>{name}</LaneChip>
          </h2>
        )}
        <div className="ml-auto flex items-center gap-1">
          <IconButton label={renameLabel} onClick={onRename}>
            <PencilIcon />
          </IconButton>
          <IconButton label={moveUpLabel} onClick={onMoveUp} disabled={!canMoveUp}>
            <ArrowUpIcon />
          </IconButton>
          <IconButton label={moveDownLabel} onClick={onMoveDown} disabled={!canMoveDown}>
            <ArrowDownIcon />
          </IconButton>
          <IconButton label={removeLabel} onClick={onRemove} disabled={!canRemove} tone="brand">
            <TrashIcon />
          </IconButton>
        </div>
      </header>
      {notes ? <p className="text-2 text-ink-soft">{notes}</p> : null}
      {children}
    </section>
  );
}
