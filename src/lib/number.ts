export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function stepValue(value: number, step: number, min: number, max: number): number {
  const stepped = Math.round((value + step) / Math.abs(step)) * Math.abs(step);
  return clamp(stepped, min, max);
}

export function parseNumberInput(raw: string, fallback: number): number {
  if (raw.trim() === '') {
    return fallback;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}
