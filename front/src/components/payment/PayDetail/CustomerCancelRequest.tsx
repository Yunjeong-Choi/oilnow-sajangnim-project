import { useLocation } from "react-router";
import styled from "styled-components";
import { PayDetailInnerBox } from "./PayDetailInfo";
import noImage from "../../../assets/images/noImage-icon.jpg";
import { useEffect, useRef } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const CustomerCancelRequest = () => {
  const location = useLocation();
  const { cancelClaim, cancelImgURL } = location.state;
  console.log(cancelClaim, cancelImgURL, location.state);
  const ref = useRef<HTMLDivElement>(null);

  // const isIntersecting = useIntersectionObserver;

  return (
    <PayDetailInnerBox>
      <span>고객 취소 요청</span>
      <RequestDetail>
        <RequestText>{cancelClaim}</RequestText>
        {cancelImgURL.length === 0 ? (
          <RequestImg>
            <span>이미지 없음</span>
          </RequestImg>
        ) : (
          <RequestImgBox>
            {/* TODO: 이미지 클릭하면 크게 볼 수 있는 라이브러리? 필요 */}
            {cancelImgURL.map((image: string, index: number) => (
              <RequestImg key={index} ref={ref}>
                <img src={image || noImage} alt="cancel img url"></img>
              </RequestImg>
            ))}
          </RequestImgBox>
        )}
      </RequestDetail>
    </PayDetailInnerBox>
  );
};

/**
 * 1. intersectionObserver로 div 감시
 * 2. 스크롤을 통해 감시영역 안으로 들어옴
 * 3. 감지되면 src를 요청
 * 4. lazyLoading...
 * */
// lazy ? (
//   <div style={{ width: 100, height: 100, color: "gray" }} />
// ) :

export default CustomerCancelRequest;

//styled-components
const RequestDetail = styled.div`
  padding: 0 1rem;

  > div:nth-of-type(1) {
    margin-top: 1rem;
    border: 0.07rem solid var(--borderGray);
    border-radius: 0.4rem;
  }
`;

const RequestText = styled.div`
  padding: 0.5em;
  height: 8rem;
  font-size: 1.4rem;
  line-height: 2rem;
`;

const RequestImgBox = styled.div`
  padding-bottom: 1.5rem;
  display: flex;
  overflow: auto;
`;

const RequestImg = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.07rem solid var(--borderGray);
  border-radius: 0.4rem;
  margin-top: 1rem;
  margin-right: 1rem;

  span {
    font-size: 1rem;
  }

  img {
    width: 7rem;
  }
`;
