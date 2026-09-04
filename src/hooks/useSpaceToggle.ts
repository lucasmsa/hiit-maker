import { useEffect } from 'react';

const interactiveTags = new Set(['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'A']);

export function useSpaceToggle(enabled: boolean, onToggle: () => void): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target && interactiveTags.has(target.tagName)) {
        return;
      }
      event.preventDefault();
      onToggle();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, onToggle]);
}
