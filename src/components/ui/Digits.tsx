import type { CSSProperties } from 'react';
import { splitGlyphs } from '@/lib/digits';
import { cx } from '@/lib/cx';

interface DigitsProps {
  value: string;
  className?: string;
  label?: string;
  style?: CSSProperties;
}

export function Digits({ value, className, label, style }: DigitsProps) {
  return (
    <span className={cx('digits', className)} style={style} role="timer" aria-live="off" aria-label={label}>
      {splitGlyphs(value).map((glyph) => (
        <span key={glyph.key} data-glyph={glyph.char}>
          {glyph.char}
        </span>
      ))}
    </span>
  );
}
