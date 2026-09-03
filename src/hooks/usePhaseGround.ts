import { useCallback, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { groundColor, groundTone, type GroundKind, type GroundTone } from '@/lib/run-view';

export interface PhaseGround {
  baseColor: string;
  sweepColor: string | null;
  sweepKey: string;
  tone: GroundTone;
  reducedMotion: boolean;
  onSweepDone: () => void;
}

export function usePhaseGround(kind: GroundKind, phaseKey: string): PhaseGround {
  const target = groundColor[kind];
  const [baseColor, setBaseColor] = useState(target);
  const reducedMotion = useReducedMotion() ?? false;

  const onSweepDone = useCallback(() => setBaseColor(target), [target]);

  return {
    baseColor,
    sweepColor: target === baseColor ? null : target,
    sweepKey: `${phaseKey}:${target}`,
    tone: groundTone(kind),
    reducedMotion,
    onSweepDone,
  };
}
