import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
        {/* TODO: 돌아갔을때 결과리스트의 스크롤을 어떻게 유지할것인가 */}
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
          {/* TODO: 돌아갔을때 결과리스트의 스크롤을 어떻게 유지할것인가 */}
          <BackwardBtn onClick={() => navigate("/")}>돌아가기</BackwardBtn>
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
  display: -webkit-flex;
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
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  padding: 3rem 2rem;
  background-color: white;

  button {
    height: 3.5rem;
    color: white;
    border: none;
    border-radius: 0.4rem;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.6rem;
    padding-top: 0.1em;
    flex-grow: 1;
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
