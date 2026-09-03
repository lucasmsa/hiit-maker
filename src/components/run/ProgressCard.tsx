import type { DotState, ProgressRow } from '@/lib/run-view';

interface ProgressCardProps {
  title: string;
  rows: ProgressRow[];
  footer: string;
}

export function ProgressCard({ title, rows, footer }: ProgressCardProps) {
  return (
    <section className="run-progress" aria-label={title}>
      <h2 className="run-progress-title">{title}</h2>
      <ol className="run-progress-list">
        {rows.map((row) => (
          <li key={row.key} className="run-progress-row">
            <span className="run-progress-name">{row.name}</span>
            <span className="run-dotcol">
              <Dot state={row.dot} ring={row.ringProgress} />
              {row.hasLine ? <Line progress={row.lineProgress} /> : null}
            </span>
          </li>
        ))}
      </ol>
      <p className="run-progress-footer">{footer}</p>
    </section>
  );
}

const RADIUS = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Dot({ state, ring }: { state: DotState; ring: number }) {
  if (state === 'done' || state === 'rest' || state === 'todo') {
    return <span className="run-dot" data-state={state} />;
  }
  const inner = state === 'train' ? 5 : 3 + 5 * ring;
  return (
    <svg className="run-ring" viewBox="0 0 20 20" aria-hidden="true" focusable="false" data-state={state}>
      <circle cx="10" cy="10" r={RADIUS} fill="none" stroke="var(--color-paper-dim)" strokeWidth="2.5" />
      <circle
        className="run-ring-fill"
        cx="10"
        cy="10"
        r={RADIUS}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE * (1 - ring)}
        transform="rotate(-90 10 10)"
      />
      <circle cx="10" cy="10" r={inner} fill="var(--color-brand)" />
    </svg>
  );
}

function Line({ progress }: { progress: number }) {
  return (
    <span className="run-line">
      <span className="run-line-fill" style={{ transform: `scaleY(${progress})` }} />
    </span>
  );
}
