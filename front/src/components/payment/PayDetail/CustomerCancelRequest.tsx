import { useLocation } from "react-router";
import styled from "styled-components";
import { PayDetailInnerBox } from "./PayDetailInfo";
import noImage from "../../../assets/images/noImage-icon.jpg";

const CustomerCancelRequest = () => {
  const location = useLocation();
  const { cancelClaim, cancelImgURL } = location.state;

  return (
    <PayDetailInnerBox>
      <span>고객 취소 요청</span>
      <RequestDetail>
        <RequestText>{cancelClaim}</RequestText>
        <div style={{ display: "flex", overflow: "auto" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 1, 2, 2, 3, 1, 2, 3].map(
            (e, i) => {
              /**
               * 1. intersectionObserver로 div 감시
               * 2. 스크롤을 통해 감시영역 안으로 들어옴
               * 3. 감지되면 src를 요청
               * 4. lazyLoading...
               * */
              // lazy ? (
              //   <div style={{ width: 100, height: 100, color: "gray" }} />
              // ) :
              return (
                <RequestImg key={e + i * 100}>
                  {i}
                  <img src={cancelImgURL || noImage} alt="cancel img url"></img>
                </RequestImg>
              );
            }
          )}
        </div>
      </RequestDetail>
    </PayDetailInnerBox>
  );
};

export default CustomerCancelRequest;

//styled-components
const RequestDetail = styled.div`
  padding: 0 1rem;

  div {
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

const RequestImg = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin: auto;
    width: 7rem;
  }
`;
