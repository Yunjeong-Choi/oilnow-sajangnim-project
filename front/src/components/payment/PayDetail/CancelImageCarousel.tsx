import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Bracket from "../../../assets/images/bracketLeft-icon.png";

interface CancelImageCarouselProps {
  setIsImageCarouselOpen: (param: boolean) => void;
}

const CancelImageCarousel = ({
  setIsImageCarouselOpen,
}: CancelImageCarouselProps) => {
  const location = useLocation();
  const { cancelImgURL } = location.state;

  return (
    <CancelImageCarouselBG>
      <ImageCarouselBox></ImageCarouselBox>
      <CarouselBtnBox>
        <button>
          <img src={Bracket} alt="Bracket" />
          <span>이전</span>
        </button>
        <button>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;

const ImageCarouselBox = styled.div`
  width: 100%;
  height: 50%; //TODO: 비율을 어떻게 유지할것인가
  background-color: white;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
`;

const CarouselBtnBox = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem;

  > button {
    display: flex;
    align-items: center;
    border: none;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--lightGray);
    border-radius: 0.4rem;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);

    img {
      width: 1.5rem;
    }

    span {
      font-size: 1.5rem;
      margin: 0 1rem;
      font-weight: bold;
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
  justify-content: right;
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
