import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useReducedMotion } from 'motion/react';
import type { Mode } from '@/lib/types';
import { useLibraryStore } from '@/stores/library';

const expandMs = 560;

export function useSplash() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lastMode = useLibraryStore((state) => state.lastMode);
  const setLastMode = useLibraryStore((state) => state.setLastMode);
  const reducedMotion = useReducedMotion();
  const [chosen, setChosen] = useState<Mode | null>(null);
  const timeout = useRef<number | null>(null);
  const forced = params.get('pick') === '1';
  const redirecting = !forced && lastMode !== null && chosen === null;

  useEffect(() => {
    if (redirecting && lastMode) {
      navigate(`/${lastMode}`, { replace: true });
    }
  }, [redirecting, lastMode, navigate]);

  useEffect(() => {
    return () => {
      if (timeout.current !== null) {
        window.clearTimeout(timeout.current);
      }
    };
  }, []);

  const choose = useCallback(
    (mode: Mode) => {
      if (chosen !== null) {
        return;
      }
      setLastMode(mode);
      setChosen(mode);
      timeout.current = window.setTimeout(() => navigate(`/${mode}`), reducedMotion ? 0 : expandMs);
    },
    [chosen, navigate, reducedMotion, setLastMode],
  );

  return { chosen, choose, redirecting };
}
