import styled from "styled-components";
import { PayDetailInnerBox } from "./PayDetailInfo";

const CustomerCancelRequest = () => {
  return (
    <PayDetailInnerBox>
      <span>고객 취소 요청</span>
      <RequestDetail>
        <RequestText>결제 금액이 잘못되었어요ㅠㅠ</RequestText>
        <RequestImg>이미지</RequestImg>
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
`;
