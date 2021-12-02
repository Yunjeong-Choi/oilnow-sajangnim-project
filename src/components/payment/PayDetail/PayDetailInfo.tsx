import styled from "styled-components";
import { useLocation } from "react-router";

const PayDetailInfo = () => {
  const location = useLocation();
  // console.log(location);

  return (
    <PayDetailInnerBox>
      <span>결제 상세 정보</span>
      <InfoTable>
        <RowTitle>
          <div>날짜</div>
          <div>차량번호</div>
          <div>주문상세</div>
          <div>이용금액</div>
        </RowTitle>
        <TableContent>
          <div>20210910</div>
          <div>20210910</div>
          <div>20210910</div>
          <div>20210910</div>
        </TableContent>
      </InfoTable>
    </PayDetailInnerBox>
  );
};

export default PayDetailInfo;

//styled-components
export const PayDetailInnerBox = styled.div`
  flex-grow: 1;
  background-color: white;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;

  span {
    text-align: left;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.6rem;
  }
`;

const InfoTable = styled.div`
  display: flex;
  padding: 1rem;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.9rem;

  div {
    display: flex;
    flex-direction: column;

    div {
      padding-top: 0.7em;
      padding-bottom: 0.7em;
      border-bottom: 0.07rem solid var(--borderGray);

      :first-child {
        border-top: 0.07rem solid var(--borderGray);
      }
    }
  }
`;

const RowTitle = styled.div`
  border-right: 0.07rem solid var(--borderGray);
  flex-grow: 1;
  max-width: 10rem;
  text-align: center;
`;

const TableContent = styled.div`
  flex-grow: 2;

  div {
    padding-left: 2em;
  }
`;
