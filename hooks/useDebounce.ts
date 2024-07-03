import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncedLoading, setDebouncedLoading] = useState<boolean>(false);

  useEffect(() => {
    setDebouncedLoading(true);
    // Update debouncedValue after user stops typing
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncedLoading(false);
    }, delay);

    // Aborts debouncedValue update if user types again before timeout
    return () => clearTimeout(handler);
  }, [value, delay]);

  // Returns the debounced value, which is only updated after the timeout
  return {
    debouncedValue,
    debouncedLoading,
  };
};

// Example of use:
// const [search, setSearch] = useState("");
// const debouncedSearch = useDebounce<string>('Hola', 500);
