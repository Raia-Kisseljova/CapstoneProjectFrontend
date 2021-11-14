import React from 'react';

export default function useDebounce<T>(value: T, ms: number): T {
  const [innerValue, setInnerValue] = React.useState(value);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInnerValue(value);
    }, ms);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, ms]);

  return innerValue;
}
