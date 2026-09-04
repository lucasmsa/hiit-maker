import { useEffect } from 'react';

export function useFocusOnMount(elementId: string) {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element instanceof HTMLInputElement) {
      element.focus();
      element.select();
      return;
    }
    element?.focus();
  }, [elementId]);
}
