import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/Field';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { LinkButton } from '@/components/hiit/LinkButton';
import { useFocusOnMount } from '@/hooks/useFocusOnMount';
import { useT } from '@/hooks/useT';
import { formatClock } from '@/lib/digits';
import { groupName, type WorkoutSummary } from '@/lib/hiit-summary';
import type { HiitWorkout } from '@/lib/types';

interface WorkoutRowProps {
  workout: HiitWorkout;
  summary: WorkoutSummary;
  renaming: boolean;
  onStartRename: () => void;
  onCancelRename: () => void;
  onCommitRename: (name: string) => void;
  onDuplicate: () => void;
  onRequestDelete: () => void;
}

export function WorkoutRow({
  workout,
  summary,
  renaming,
  onStartRename,
  onCancelRename,
  onCommitRename,
  onDuplicate,
  onRequestDelete,
}: WorkoutRowProps) {
  const t = useT();
  const inputId = `rename-${workout.id}`;

  const submitRename = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get('name');
    onCommitRename(typeof value === 'string' ? value : workout.name);
  };

  return (
    <li className="grid gap-4 border-b border-ink/10 py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="flex min-w-0 flex-col gap-2">
        {renaming ? (
          <form onSubmit={submitRename} className="flex flex-wrap items-end gap-2">
            <RenameField id={inputId} label={t('hiit.library.renameLabel')} defaultValue={workout.name} />
            <Button type="submit">{t('action.save')}</Button>
            <Button variant="ghost" onClick={onCancelRename}>
              {t('action.cancel')}
            </Button>
          </form>
        ) : (
          <Link
            to={`/hiit/${workout.id}`}
            className="truncate font-display text-6 font-extrabold leading-none text-ink hover:text-brand-deep"
          >
            {workout.name}
          </Link>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-soft">
          <span>{t('hiit.library.setCount', { count: summary.setCount })}</span>
          <span>{t('library.exerciseCount', { count: summary.exerciseCount })}</span>
          <span className="font-bold tabular-nums text-ink">{formatClock(summary.totalSeconds * 1000)}</span>
          {summary.groups.length > 0 ? (
            <ul className="flex items-center gap-1.5" aria-label={t('label.targetMuscles')}>
              {summary.groups.map((group) => (
                <li key={group} className="text-brand-deep">
                  <MuscleIcon name={group} />
                  <span className="sr-only">{groupName(group, t)}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <LinkButton to={`/hiit/${workout.id}`} variant="secondary">
          {t('hiit.library.open')}
        </LinkButton>
        <Button variant="ghost" onClick={onStartRename} disabled={renaming}>
          {t('action.rename')}
        </Button>
        <Button variant="ghost" onClick={onDuplicate}>
          {t('action.duplicate')}
        </Button>
        <Button variant="ghost" onClick={onRequestDelete} className="text-brand-deep">
          {t('action.delete')}
        </Button>
      </div>
    </li>
  );
}

function RenameField({ id, label, defaultValue }: { id: string; label: string; defaultValue: string }) {
  useFocusOnMount(id);
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="text-1 font-bold text-ink-soft">
        {label}
      </label>
      <TextInput id={id} name="name" defaultValue={defaultValue} required maxLength={60} />
    </div>
  );
}
