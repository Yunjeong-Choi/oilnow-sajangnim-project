import { MutableRefObject, useEffect, useRef, useState } from "react";

const useIntersectionObserver = (
  ref: MutableRefObject<Element | null>,
  options: IntersectionObserverInit = {}
) => {
  const [element, setElement] = useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (!element) return;
    cleanOb();
    //TODO: 이런 문법이 다 있네..
    const ob = (observer.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
      },
      { ...options }
    ));
    ob.observe(element);
    cleanOb();
    //   TODO: 이렇게 까지 감싸줘야 하는 이유가 있나?
    //   return (()=> {cleanOb()})
  }, [element, options]);

  return isIntersecting;
};

export default useIntersectionObserver;
