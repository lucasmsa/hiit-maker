import { useEffect } from 'react';

export function useWakeLock(active: boolean): void {
  useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      return;
    }

    let sentinel: WakeLockSentinel | null = null;
    let released = false;

    const acquire = async () => {
      try {
        const next = await navigator.wakeLock.request('screen');
        if (released) {
          await next.release();
          return;
        }
        sentinel = next;
      } catch {
        sentinel = null;
      }
    };

    const reacquireWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        void acquire();
      }
    };

    void acquire();
    document.addEventListener('visibilitychange', reacquireWhenVisible);

    return () => {
      released = true;
      document.removeEventListener('visibilitychange', reacquireWhenVisible);
      void sentinel?.release();
    };
  }, [active]);
}
