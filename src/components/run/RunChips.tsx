import { LaneChip } from '@/components/ui/LaneChip';

interface RunChipsProps {
  setText: string | undefined;
  phaseText: string;
}

export function RunChips({ setText, phaseText }: RunChipsProps) {
  return (
    <div className="run-chips">
      {setText ? <LaneChip className="run-chip">{setText}</LaneChip> : null}
      <h1 className="run-chip-heading">
        <LaneChip className="run-chip run-chip-phase">{phaseText}</LaneChip>
      </h1>
    </div>
  );
}
