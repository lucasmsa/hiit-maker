import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyState = 'idle' | 'copied' | 'failed';

const RESET_MS = 2000;

export function useCopyLink(getUrl: () => string) {
  const [state, setState] = useState<CopyState>('idle');
  const [url, setUrl] = useState('');
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);

  const copy = useCallback(async () => {
    const next = getUrl();
    setUrl(next);
    try {
      await navigator.clipboard.writeText(next);
    } catch {
      setState('failed');
      return;
    }
    setState('copied');
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => setState('idle'), RESET_MS);
  }, [getUrl]);

  return { state, url, copy };
}
