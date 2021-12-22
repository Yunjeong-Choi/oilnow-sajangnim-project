import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Bracket from "../../../assets/images/bracketLeft-icon.png";

interface CancelImageCarouselProps {
  setIsImageCarouselOpen: (param: boolean) => void;
  clickedSlide: number;
}

const CancelImageCarousel = ({
  setIsImageCarouselOpen,
  clickedSlide,
}: CancelImageCarouselProps) => {
  const location = useLocation();
  const { cancelImgURL } = location.state;
  const TOTAL_SLIDES = cancelImgURL.length - 1;
  const [currentSlide, setCurrentSlide] = useState<number>(clickedSlide);
  const slideRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    if (!slideRef || !slideRef.current) return;
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <CancelImageCarouselBG>
      <ImageCarouselBox ref={slideRef}>
        {cancelImgURL.map((url: string, index: number) => (
          <div key={index}>
            <div>
              <img src={url} alt="Cancel Request Image" />
            </div>
          </div>
        ))}
      </ImageCarouselBox>
      <CarouselBtnBox>
        <button onClick={prevSlide}>
          <img src={Bracket} alt="Bracket" />
          <span>이전</span>
        </button>
        <span>
          {currentSlide + 1}/{cancelImgURL.length}
        </span>
        <button onClick={nextSlide}>
          <span>다음</span>
          <img src={Bracket} alt="Bracket" />
        </button>
      </CarouselBtnBox>
      <CloseBtnBox>
        <button onClick={() => setIsImageCarouselOpen(false)}>X 닫기</button>
      </CloseBtnBox>
    </CancelImageCarouselBG>
  );
};

export default CancelImageCarousel;

//styled-components
const CancelImageCarouselBG = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(196, 196, 196, 0.8);
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
  overflow: hidden;
  padding: 1.5rem;
`;

const ImageCarouselBox = styled.div`
  width: 100%;
  max-width: 65rem;
  display: flex;
  display: -webkit-flex;

  > div {
    background-color: white;
    padding-top: 100%;
    min-width: 100%;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);

    > div {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-transform: translate(50%, 50%);
      -ms-transform: translate(50%, 50%);
      transform: translate(50%, 50%);

      > img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
        height: auto;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    }
  }
`;

const CarouselBtnBox = styled.div`
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  padding: 1.2rem;

  span {
    font-size: 1.5rem;
    margin: 0 1rem;
    font-weight: bold;
  }

  > button {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    border: none;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--lightGray);
    border-radius: 0.4rem;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);

    img {
      width: 1.5rem;
    }
  }

  button:nth-of-type(2) {
    img {
      transform: rotate(180deg);
    }
  }
`;

const CloseBtnBox = styled.div`
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: right;
  -webkit-justify-content: right;
  margin-right: 1.5rem;

  button {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    background-color: var(--gray);
    border-radius: 0.4rem;
    border: none;
    padding: 1rem 1.5rem;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  }
`;
