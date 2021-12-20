import { useRef } from "react";

const useDebounce = (fn: (arg?: any) => void, delay = 225) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (...params: any) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      fn(...params);
      timer.current = null;
    }, delay);
  };
};

export default useDebounce;
