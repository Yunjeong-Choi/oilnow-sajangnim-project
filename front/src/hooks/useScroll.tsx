import { useEffect, useRef, useState } from "react";
import { PayDataListProps } from "../components/payment/PayResult/ResultList";

const useScroll = (itemHeight: number, list: PayDataListProps[]) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainer = scrollContainerRef.current;
  const [containerHeight, setContainerHeight] = useState<number>(
    itemHeight * 30
  );
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScrollHeight = () => {
    if (!scrollContainer)
      return console.log("no scrollContainer", "handleScrollHeight");

    setContainerHeight(scrollContainer.scrollHeight);
    setScrollTop(scrollContainer.scrollTop);
  };

  useEffect(() => {
    if (!scrollContainer)
      return console.log("no scrollContainer", "addEventListener");

    scrollContainer.addEventListener("scroll", handleScrollHeight);
    return () =>
      scrollContainer.removeEventListener("scroll", handleScrollHeight);
  }, [list]);

  return { scrollTop, containerHeight, scrollContainerRef };
};

export default useScroll;
