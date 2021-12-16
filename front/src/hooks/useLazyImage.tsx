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
