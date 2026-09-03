import type { KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { IconButton } from '@/components/ui/IconButton';
import { TextInput } from '@/components/ui/Field';
import { useFocusRef } from '@/hooks/useFocusRef';
import { CopyIcon, PencilIcon, PlayIcon, TrashIcon } from '@/components/gym/gym-icons';

interface RoutineRowProps {
  name: string;
  meta: string;
  lastSession: string;
  to: string;
  startTo: string;
  startLabel: string;
  renameLabel: string;
  duplicateLabel: string;
  deleteLabel: string;
  renaming: boolean;
  renameValue: string;
  onRenameChange: (value: string) => void;
  onRenameCommit: () => void;
  onRenameCancel: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function RoutineRow({
  name,
  meta,
  lastSession,
  to,
  startTo,
  startLabel,
  renameLabel,
  duplicateLabel,
  deleteLabel,
  renaming,
  renameValue,
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
  onRename,
  onDuplicate,
  onDelete,
}: RoutineRowProps) {
  const focusOnMount = useFocusRef();
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onRenameCommit();
    } else if (event.key === 'Escape') {
      onRenameCancel();
    }
  };

  return (
    <li className="flex flex-col gap-3 border-b border-ink/10 py-5 sm:flex-row sm:items-center sm:gap-6">
      <div className="min-w-0 flex-1">
        {renaming ? (
          <span ref={focusOnMount} className="contents">
            <TextInput
              aria-label={renameLabel}
              value={renameValue}
              onChange={(event) => onRenameChange(event.target.value)}
              onBlur={onRenameCommit}
              onKeyDown={onKeyDown}
              className="font-display text-5 font-extrabold"
            />
          </span>
        ) : (
          <Link
            to={to}
            className="block truncate font-display text-6 font-extrabold text-ink hover:text-brand-deep"
          >
            {name}
          </Link>
        )}
        <p className="mt-1 text-2 text-ink-soft">
          {meta}. {lastSession}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Link
          to={startTo}
          className="inline-flex h-11 items-center gap-2 rounded-button bg-brand-deep px-4 font-bold text-white transition-colors duration-150 hover:bg-[#a81c23]"
        >
          <PlayIcon size={18} />
          {startLabel}
        </Link>
        <IconButton label={renameLabel} onClick={onRename}>
          <PencilIcon />
        </IconButton>
        <IconButton label={duplicateLabel} onClick={onDuplicate}>
          <CopyIcon />
        </IconButton>
        <IconButton label={deleteLabel} onClick={onDelete} tone="brand">
          <TrashIcon />
        </IconButton>
      </div>
    </li>
  );
}
