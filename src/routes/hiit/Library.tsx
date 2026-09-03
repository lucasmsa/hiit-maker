import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { WorkoutRow } from '@/components/hiit/WorkoutRow';
import { useHiitLibrary } from '@/hooks/useHiitLibrary';
import { useT } from '@/hooks/useT';

export function HiitLibrary() {
  const t = useT();
  const library = useHiitLibrary();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-8">{t('hiit.library.title')}</h1>
        <Button onClick={library.createNew} size="lg">
          {t('hiit.library.new')}
        </Button>
      </div>

      {library.rows.length === 0 ? (
        <p className="mt-10 max-w-prose text-3 text-ink-soft">{t('library.empty.hiit')}</p>
      ) : (
        <ul className="mt-6">
          {library.rows.map(({ workout, summary }) => (
            <WorkoutRow
              key={workout.id}
              workout={workout}
              summary={summary}
              renaming={library.renamingId === workout.id}
              onStartRename={() => library.startRename(workout.id)}
              onCancelRename={library.cancelRename}
              onCommitRename={(name) => library.commitRename(workout.id, name)}
              onDuplicate={() => library.duplicate(workout.id)}
              onRequestDelete={() => library.requestDelete(workout.id)}
            />
          ))}
        </ul>
      )}

      <Dialog
        id="delete-workout"
        open={library.deleting !== null}
        onClose={library.cancelDelete}
        title={t('hiit.library.deleteTitle')}
      >
        <p>{t('hiit.library.deleteBody', { name: library.deleting?.name ?? '' })}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={library.cancelDelete}>
            {t('action.cancel')}
          </Button>
          <Button variant="danger" onClick={library.confirmDelete}>
            {t('action.delete')}
          </Button>
        </div>
      </Dialog>
    </main>
  );
}
