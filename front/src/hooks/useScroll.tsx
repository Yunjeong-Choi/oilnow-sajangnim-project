import { useEffect, useRef, useState } from "react";
import { PayDataListProps } from "../components/payment/PayResult/ResultList";
import useThrottle from "./useThrottle";

const useScroll = (itemHeight: number, list: PayDataListProps[]) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainer = scrollContainerRef.current;
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(
    itemHeight * 30
  );

  const handleScrollHeight = () => {
    if (!scrollContainer)
      return console.log("no scrollContainer", "handleScrollHeight");

    setContainerHeight(scrollContainer.scrollHeight);
    setScrollTop(scrollContainer.scrollTop);
  };

  const throttledScrollHeight = useThrottle(() => {
    handleScrollHeight();
    console.log("Throttled!");
  });

  useEffect(() => {
    if (!scrollContainer)
      return console.log("no scrollContainer", "addEventListener");

    // scrollContainer.addEventListener("scroll", handleScrollHeight);
    scrollContainer.addEventListener("scroll", throttledScrollHeight);

    return () =>
      // scrollContainer.removeEventListener("scroll", handleScrollHeight);
      scrollContainer.removeEventListener("scroll", throttledScrollHeight);
  }, [list]);

  return { scrollTop, containerHeight, scrollContainerRef };
};

export default useScroll;
