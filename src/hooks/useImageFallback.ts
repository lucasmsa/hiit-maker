import { useCallback, useState } from 'react';

export function useImageFallback(source: string) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const onError = useCallback(() => setFailedSource(source), [source]);
  return { failed: failedSource === source, onError };
}
