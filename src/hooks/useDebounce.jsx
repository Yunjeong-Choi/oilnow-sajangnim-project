import { useRef } from "react";

const useDebounce = (fn, delay = 225) => {
  const timer = useRef(null);

  return (...params) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      console.log("Debounce fire!", params);
      fn(...params);
      timer.current = null;
    }, delay);
  };
};

export default useDebounce;

//TODO: ...params의 구조가 이해가 되지 않음. onchange로부터 받은 걸 열어주는건가?
//TODO: hook은 jsx로 해줘도 되나? 재사용성을 위해서?
