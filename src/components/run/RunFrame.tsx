import { DoneArt, WarmupArt } from '@/components/run/run-art';

export type FrameArt =
  | { kind: 'photo'; photo: string; alt: string }
  | { kind: 'text'; text: string }
  | { kind: 'warmup' }
  | { kind: 'done' };

interface RunFrameProps {
  color: string;
  art: FrameArt;
}

export function RunFrame({ color, art }: RunFrameProps) {
  return (
    <figure className="run-frame" style={{ backgroundColor: color }}>
      {renderArt(art)}
    </figure>
  );
}

function renderArt(art: FrameArt) {
  switch (art.kind) {
    case 'photo':
      return (
        <img
          src={`/exercises/${art.photo}-960.webp`}
          srcSet={`/exercises/${art.photo}-480.webp 480w, /exercises/${art.photo}-960.webp 960w`}
          sizes="(min-width: 900px) 40vw, 90vw"
          alt={art.alt}
          decoding="async"
        />
      );
    case 'text':
      return <span className="run-frame-text">{art.text}</span>;
    case 'warmup':
      return <WarmupArt className="run-frame-art" />;
    case 'done':
      return <DoneArt className="run-frame-art" />;
    default:
      return null;
  }
}
