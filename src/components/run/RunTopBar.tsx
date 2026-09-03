import { IconButton } from '@/components/ui/IconButton';
import { Toggle } from '@/components/ui/Toggle';
import { ExitIcon } from '@/components/run/run-icons';

interface RunTopBarProps {
  exitLabel: string;
  onExit: () => void;
  soundLabel: string;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
}

export function RunTopBar({ exitLabel, onExit, soundLabel, muted, onMutedChange }: RunTopBarProps) {
  return (
    <div className="run-top">
      <IconButton label={exitLabel} onClick={onExit} className="run-exit">
        <ExitIcon />
      </IconButton>
      <Toggle id="run-sound" label={soundLabel} checked={!muted} onChange={(on) => onMutedChange(!on)} />
    </div>
  );
}
