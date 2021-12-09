import { UIEvent, useRef } from "react";
// UIEvent<HTMLElement>

//TODO: 타입 체크 필요
const useThrottle = (fn: (arg?: any) => void, delay = 225) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (...params: any) => {
    if (timer.current) return;

    timer.current = setTimeout(() => {
      fn(...params);
      timer.current = null;
    }, delay);
  };
};

export default useThrottle;
