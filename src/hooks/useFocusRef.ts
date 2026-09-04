import { useCallback } from 'react';

export function useFocusRef() {
  return useCallback((node: HTMLElement | null) => {
    const target = node?.matches('input, textarea')
      ? node
      : node?.querySelector<HTMLElement>('input, textarea');
    target?.focus();
    if (target instanceof HTMLInputElement) {
      target.select();
    }
  }, []);
}
