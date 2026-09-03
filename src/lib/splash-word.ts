const displayGlyphWidthEm = 0.42;

export function splashWordSize(word: string, panelWidthVw: number, maxVw: number): string {
  const fitVw = panelWidthVw / (displayGlyphWidthEm * Math.max(1, word.length));
  return `${Math.min(maxVw, fitVw).toFixed(1)}vw`;
}
