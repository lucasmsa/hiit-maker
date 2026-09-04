export function formatClock(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const two = (n: number) => String(n).padStart(2, '0');
  if (hours > 0) {
    return `${hours}:${two(minutes)}:${two(seconds)}`;
  }
  return `${two(minutes)}:${two(seconds)}`;
}

export interface Glyph {
  key: string;
  char: string;
}

export function splitGlyphs(text: string): Glyph[] {
  return Array.from(text).map((char, index) => ({ key: `${index}-${char}`, char }));
}
