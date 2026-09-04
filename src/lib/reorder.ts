export interface Move {
  id: string;
  toIndex: number;
}

export function reorderMoves(current: string[], next: string[]): Move[] {
  const moves: Move[] = [];
  const working = [...current];
  next.forEach((id, index) => {
    if (working[index] === id) {
      return;
    }
    const from = working.indexOf(id);
    if (from === -1) {
      return;
    }
    working.splice(from, 1);
    working.splice(index, 0, id);
    moves.push({ id, toIndex: index });
  });
  return moves;
}
