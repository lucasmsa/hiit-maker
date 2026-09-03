import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePhaseGround } from '@/hooks/usePhaseGround';
import type { GroundKind } from '@/lib/run-view';

interface RunGroundProps {
  kind: GroundKind;
  phaseKey: string;
  children: ReactNode;
}

const sweepTransition = { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const };

export function RunGround({ kind, phaseKey, children }: RunGroundProps) {
  const ground = usePhaseGround(kind, phaseKey);
  return (
    <main className="run" data-tone={ground.tone} data-ground={kind}>
      <div className="run-ground" style={{ background: ground.baseColor }} />
      {ground.sweepColor ? (
        <motion.div
          key={ground.sweepKey}
          className="run-sweep"
          style={{ background: ground.sweepColor }}
          initial={ground.reducedMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
          animate={ground.reducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0)' }}
          transition={sweepTransition}
          onAnimationComplete={ground.onSweepDone}
        />
      ) : null}
      {children}
    </main>
  );
}
