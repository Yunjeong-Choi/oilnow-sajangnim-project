import { useEffect, useRef, useState } from "react";
import { PayDataListProps } from "../components/payment/PayResult/model";
import useThrottle from "./useThrottle";

const useScroll = (
  itemHeight: number,
  list: PayDataListProps[],
  filteredList: PayDataListProps[]
) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainer = scrollContainerRef.current;
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(
    itemHeight * 30
  );

  const handleScrollHeight = () => {
    if (!scrollContainer)
      return console.log("no scrollContainer", "handleScrollHeight");

    //TODO: filteredList가 바뀌면 containerHeight도 바뀌어야 불필요한 아래여백이 남지 않을것 같은데 없어지지 않는군..
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
  }, [list, filteredList]);

  return { scrollTop, containerHeight, scrollContainerRef };
};

export default useScroll;
