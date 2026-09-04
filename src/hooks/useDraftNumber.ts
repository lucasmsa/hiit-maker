import { useCallback, useState } from 'react';
import { stepValue } from '@/lib/number';

interface Draft {
  base: number;
  text: string;
}

export function useDraftNumber(value: number, onChange: (next: number) => void, min: number, max: number, step: number) {
  const [stored, setStored] = useState<Draft | null>(null);
  const draft = stored && stored.base === value ? stored.text : null;
  const text = draft ?? String(value);

  const change = useCallback(
    (raw: string) => {
      setStored({ base: value, text: raw });
      const parsed = Number(raw);
      if (raw.trim() !== '' && Number.isFinite(parsed) && parsed >= min && parsed <= max) {
        onChange(parsed);
      }
    },
    [max, min, onChange, value],
  );

  const commit = useCallback(() => {
    if (draft === null) {
      return;
    }
    const parsed = Number(draft);
    const next = draft.trim() === '' || !Number.isFinite(parsed) ? value : Math.min(Math.max(parsed, min), max);
    setStored(null);
    if (next !== value) {
      onChange(next);
    }
  }, [draft, max, min, onChange, value]);

  const increase = useCallback(() => onChange(stepValue(value, step, min, max)), [max, min, onChange, step, value]);
  const decrease = useCallback(() => onChange(stepValue(value, -step, min, max)), [max, min, onChange, step, value]);

  return { text, change, commit, increase, decrease, atMin: value <= min, atMax: value >= max };
}
