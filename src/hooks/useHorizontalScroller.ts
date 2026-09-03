import { useCallback, useRef } from 'react';

export function useHorizontalScroller() {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const element = ref.current;
    if (!element) {
      return;
    }
    element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: 'smooth' });
  }, []);

  const scrollLeft = useCallback(() => scrollBy(-1), [scrollBy]);
  const scrollRight = useCallback(() => scrollBy(1), [scrollBy]);

  return { ref, scrollLeft, scrollRight };
}
