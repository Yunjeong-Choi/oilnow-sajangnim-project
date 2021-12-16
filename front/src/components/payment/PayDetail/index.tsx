import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import bracketLeft from "../../../assets/images/bracketLeft-icon.png";
import { MainLayout } from "../../../containers/common/ContainerLayout";
import CustomerCancelRequest from "./CustomerCancelRequest";
import PayDetailInfo from "./PayDetailInfo";
import PayCancelModal from "./PayCancelModal";
import CancelImageCarousel from "./CancelImageCarousel";

const PayDetail = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isImageCarouselOpen, setIsImageCarouselOpen] =
    useState<boolean>(false);
  const [clickedSlide, setClickedSlide] = useState<number>(0);

  return (
    <>
      {isImageCarouselOpen ? (
        <CancelImageCarousel
          setIsImageCarouselOpen={setIsImageCarouselOpen}
          clickedSlide={clickedSlide}
        />
      ) : null}
      {isCancelModalOpen ? (
        <PayCancelModal setIsCancelModalOpen={setIsCancelModalOpen} />
      ) : null}
      <HeaderLayout>
        <Link to="/">
          <button>
            <img src={bracketLeft} alt="bracket Left"></img>
          </button>
        </Link>
        <span>결제상세</span>
      </HeaderLayout>
      <MainLayout>
        <PayDetailInfo />
        <CustomerCancelRequest
          setIsImageCarouselOpen={setIsImageCarouselOpen}
          setClickedSlide={setClickedSlide}
        />
        <ProcessOptions>
          <Link to="/">
            <BackwardBtn>돌아가기</BackwardBtn>
          </Link>
          <PayCancelBtn onClick={() => setIsCancelModalOpen(true)}>
            결제취소
          </PayCancelBtn>
        </ProcessOptions>
      </MainLayout>
    </>
  );
};

export default PayDetail;

//styled-components
const HeaderLayout = styled.header`
  display: flex;
  padding: 1.8rem 1.2rem;

  span {
    font-weight: bold;
    font-size: 2.8rem;
    line-height: 4.1rem;
    margin-left: 1rem;
  }

  button {
    padding: 0.8rem 1.1rem;
    margin-top: 0.1rem;
    border: none;
    background-color: white;

    img {
      width: 1.5rem;
      height: 2.5rem;
    }
  }
`;

const ProcessOptions = styled.div`
  flex-grow: 8;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 3rem;
  background-color: white;

  button {
    height: 3.5rem;
    width: 15rem;
    color: white;
    border: none;
    border-radius: 0.4rem;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.6rem;
    padding-top: 0.1em;
  }
`;

const BackwardBtn = styled.button`
  height: 3.5rem;
  background-color: var(--gray);
  margin-right: 1.5rem;
`;

const PayCancelBtn = styled.button`
  background-color: var(--red);
`;
//TODOs: 왜 화면폭이 줄어들면 paycancel 의 width만 줄어들지
