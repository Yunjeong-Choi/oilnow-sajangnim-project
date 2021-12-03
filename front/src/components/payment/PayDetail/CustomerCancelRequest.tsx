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
        <RequestImg>
          <img src={cancelImgURL || noImage} alt="cancel img url"></img>
        </RequestImg>
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
  align-items: center;

  img {
    margin: auto;
    width: 7rem;
  }
`;
