import type { ReactNode } from 'react';
import { useDialog } from '@/hooks/useDialog';
import { useT } from '@/hooks/useT';
import { IconButton } from '@/components/ui/IconButton';
import { CloseIcon } from '@/components/ui/icons';

interface DialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  sheet?: boolean;
}

export function Dialog({ id, open, onClose, title, children, sheet }: DialogProps) {
  const t = useT();
  const { ref, onCancel } = useDialog(open, onClose);
  return (
    <dialog
      ref={ref}
      className="dialog"
      data-sheet={sheet ? '' : undefined}
      aria-labelledby={`${id}-title`}
      onCancel={onCancel}
    >
      <div className="dialog-panel">
        <h2 id={`${id}-title`} className="mb-4 pr-12 text-5">
          {title}
        </h2>
        {children}
        <IconButton label={t('action.close')} onClick={onClose} className="dialog-close">
          <CloseIcon />
        </IconButton>
      </div>
    </dialog>
  );
}

export function BottomSheet(props: Omit<DialogProps, 'sheet'>) {
  return <Dialog {...props} sheet />;
}
