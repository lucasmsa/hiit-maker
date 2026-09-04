import { LaneChip } from '@/components/ui/LaneChip';
import { cx } from '@/lib/cx';

interface RunChipsProps {
  setText: string | undefined;
  phaseText: string;
}

export function RunChips({ setText, phaseText }: RunChipsProps) {
  return (
    <div className="run-chips">
      <LaneChip className={cx('run-chip', setText ? undefined : 'run-chip-empty')}>{setText ?? ''}</LaneChip>
      <h1 className="run-chip-heading">
        <LaneChip className="run-chip run-chip-phase">{phaseText}</LaneChip>
      </h1>
    </div>
  );
}
