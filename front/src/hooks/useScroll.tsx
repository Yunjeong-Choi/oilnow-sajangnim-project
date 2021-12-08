import { UIEvent, useEffect, useRef, useState } from "react";
import useThrottle from "./useThrottle";

const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef<HTMLDivElement>();

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const curScrollTop = e.currentTarget.scrollTop;
    console.log("scroll!", curScrollTop);
    requestAnimationFrame(() => {
      setScrollTop(curScrollTop);
    });
  };

  //TODO: 타입과 얼리리턴 확인 필요
  const throttleOnScroll = useThrottle((e?: UIEvent<HTMLElement>) => {
    if (!e) return;
    console.log("Throttled!");
    handleScroll(e);
  });

  useEffect(() => {
    if (!ref.current) return;
    const scrollContainer = ref.current;
    // INTO: THROTTLE SCROLL
    scrollContainer.addEventListener("scroll", throttleOnScroll);
    // INTO: RAW SCROLL
    // scrollContainer.addEventListener("scroll", handleScroll);
    setScrollTop(scrollContainer.scrollTop);

    return () => {
      // TODO: 왜 remove를 할까
      scrollContainer.removeEventListener("scroll", throttleOnScroll);
      // scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [scrollTop, ref];
};

export default useScroll;
