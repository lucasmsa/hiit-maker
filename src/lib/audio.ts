export interface Cues {
  unlock(): void;
  tick(): void;
  chime(): void;
  finish(): void;
}

type ContextFactory = () => AudioContext | null;

const defaultContextFactory: ContextFactory = () =>
  typeof AudioContext === 'undefined' ? null : new AudioContext();

export function createCues(factory: ContextFactory = defaultContextFactory): Cues {
  let context: AudioContext | null = null;

  const ensureContext = (): AudioContext | null => {
    context ??= factory();
    if (context?.state === 'suspended') {
      void context.resume();
    }
    return context;
  };

  const tone = (frequency: number, startOffset: number, duration: number, volume = 0.2) => {
    const ctx = ensureContext();
    if (!ctx) {
      return;
    }
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + startOffset;
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  };

  return {
    unlock: () => {
      ensureContext();
    },
    tick: () => tone(880, 0, 0.08),
    chime: () => {
      tone(660, 0, 0.12);
      tone(990, 0.12, 0.18);
    },
    finish: () => {
      tone(660, 0, 0.12);
      tone(880, 0.12, 0.12);
      tone(1320, 0.24, 0.35, 0.25);
    },
  };
}
