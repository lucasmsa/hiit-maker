import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollEdges {
  atStart: boolean;
  atEnd: boolean;
}

function measure(element: HTMLDivElement): ScrollEdges {
  const max = element.scrollWidth - element.clientWidth;
  return { atStart: element.scrollLeft <= 8, atEnd: element.scrollLeft >= max - 8 };
}

export function useHorizontalScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<ScrollEdges>({ atStart: true, atEnd: true });

  const update = useCallback(() => {
    const element = ref.current;
    if (element) {
      setEdges(measure(element));
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    update();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [update]);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const element = ref.current;
    if (!element) {
      return;
    }
    element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: 'smooth' });
  }, []);

  const scrollLeft = useCallback(() => scrollBy(-1), [scrollBy]);
  const scrollRight = useCallback(() => scrollBy(1), [scrollBy]);

  return { ref, scrollLeft, scrollRight, onScroll: update, ...edges };
}
