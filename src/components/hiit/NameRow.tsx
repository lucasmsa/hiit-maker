import type { RefObject } from 'react';
import { Button } from '@/components/ui/Button';
import { ChevronDownIcon, FolderIcon } from '@/components/hiit/OriginalIcons';
import { useT } from '@/hooks/useT';

interface NameRowProps {
  value: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  onCommit: () => void;
  onOpenSwitcher: () => void;
}

export function NameRow({ value, inputRef, onChange, onCommit, onOpenSwitcher }: NameRowProps) {
  const t = useT();
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[14rem] flex-1">
        <label htmlFor="workout-name" className="sr-only">
          {t('hiit.builder.name')}
        </label>
        <input
          ref={inputRef}
          id="workout-name"
          className="name-input"
          value={value}
          maxLength={60}
          placeholder={t('label.untitledWorkout')}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onCommit}
        />
      </div>
      <Button variant="ghost" onClick={onOpenSwitcher} aria-haspopup="dialog" className="shrink-0 pl-3">
        <FolderIcon size={20} />
        {t('hiit.builder.workouts')}
        <ChevronDownIcon size={18} />
      </Button>
    </div>
  );
}
