import { useRef } from "react";

const useDebounce = (fn, delay = 225) => {
  const timer = useRef(null);

  return (...params) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      fn(...params);
      timer.current = null;
    }, delay);
  };
};

export default useDebounce;
