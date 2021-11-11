import React from 'react';

export default function useDebounce(callback: () => void, ms: number, deps: unknown[]) {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(callbackRef.current, ms);
  }, deps); // eslint-disable-line
}
