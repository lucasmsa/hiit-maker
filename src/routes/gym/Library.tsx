import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/gym/ConfirmDialog';
import { RoutineRow } from '@/components/gym/RoutineRow';
import { useGymLibrary } from '@/hooks/useGymLibrary';
import { useT } from '@/hooks/useT';
import { formatDate } from '@/lib/gym-format';

export function GymLibrary() {
  const t = useT();
  const library = useGymLibrary();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-8">{t('gym.library.title')}</h1>
        <Button onClick={library.create}>{t('gym.library.new')}</Button>
      </header>

      {library.rows.length === 0 ? (
        <p className="mt-10 max-w-[40ch] text-3">{t('library.empty.gym')}</p>
      ) : (
        <ul className="mt-6">
          {library.rows.map((row) => (
            <RoutineRow
              key={row.routine.id}
              name={row.routine.name.trim() === '' ? t('label.untitledRoutine') : row.routine.name}
              meta={t('gym.library.meta', { days: row.dayCount, entries: row.entryCount })}
              lastSession={
                row.lastSessionAt === null
                  ? t('gym.library.noSession')
                  : t('gym.library.lastSession', {
                      date: formatDate(row.lastSessionAt, library.language),
                    })
              }
              to={`/gym/${row.routine.id}`}
              startTo={`/gym/${row.routine.id}/run`}
              startLabel={t('gym.library.start')}
              renameLabel={t('action.rename')}
              duplicateLabel={t('action.duplicate')}
              deleteLabel={t('action.delete')}
              renaming={library.renaming?.id === row.routine.id}
              renameValue={library.renaming?.id === row.routine.id ? library.renaming.value : ''}
              onRenameChange={library.changeRename}
              onRenameCommit={library.commitRename}
              onRenameCancel={library.cancelRename}
              onRename={() => library.startRename(row.routine)}
              onDuplicate={() => library.duplicate(row.routine)}
              onDelete={() => library.requestDelete(row.routine)}
            />
          ))}
        </ul>
      )}

      <ConfirmDialog
        id="delete-routine"
        open={library.deleting !== null}
        title={t('gym.library.deleteTitle')}
        body={t('gym.library.deleteBody', { name: library.deleting?.name ?? '' })}
        confirmLabel={t('action.delete')}
        cancelLabel={t('action.cancel')}
        danger
        onConfirm={library.confirmDelete}
        onClose={library.cancelDelete}
      />
    </main>
  );
}
