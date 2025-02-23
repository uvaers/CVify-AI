import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 250) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/*useDebounce is the name of the hook.
<T>: This is a TypeScript generic, meaning the hook can be used with any type (string, number, boolean, etc.).
value: The input value (which you want to debounce).
delay: The amount of time (in milliseconds) to wait before updating the value. It defaults to 250ms if not provided.*/