export function parseViewBox(viewBox: string): { x: number; y: number; width: number; height: number } {
  const [x = 0, y = 0, width = 0, height = 0] = viewBox.split(/\s+/).map(Number);
  return { x, y, width, height };
}

export function fitTransform(viewBox: string, box: number): string {
  const { x, y, width, height } = parseViewBox(viewBox);
  const scale = box / Math.max(width, height);
  const tx = (box - width * scale) / 2 - x * scale;
  const ty = (box - height * scale) / 2 - y * scale;
  return `translate(${round(tx)} ${round(ty)}) scale(${round(scale)})`;
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}
