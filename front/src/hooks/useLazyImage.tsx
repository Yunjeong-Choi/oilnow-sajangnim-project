const onImageInView: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const imageSrc = element.getAttribute("data-src");

      if (!imageSrc) return;
      element.removeAttribute("data-src");
      element.setAttribute("src", imageSrc);

      observer.unobserve(element);
    }
  });
};

const useLazyImage = (
  inViewCallback: IntersectionObserverCallback = onImageInView,
  newOptions = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: document.querySelector(".RequestImgList"),
    threshold: 1,
  };

  return new IntersectionObserver(
    inViewCallback,
    Object.assign(defaultOptions, newOptions)
  );
};

export default useLazyImage;

/**
 * 1. intersectionObserver로 div 감시
 * 2. 스크롤을 통해 감시영역 안으로 들어옴
 * 3. 감지되면 src를 요청
 * 4. lazyLoading...
 * */
// lazy ? (
//   <div style={{ width: 100, height: 100, color: "gray" }} />
// ) :
