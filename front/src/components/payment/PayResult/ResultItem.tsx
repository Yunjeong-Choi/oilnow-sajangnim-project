import { FunctionComponent } from "react";
import styled from "styled-components";
import bracketRight from "../../../assets/images/bracketRight-icon.png";
import { Link } from "react-router-dom";
import { PayDataListProps } from "./model";

interface ResultItemProps extends PayDataListProps {
  itemHeight: number;
}

interface ParsePayStatusType {
  [key: string]: string;
}

export const parsePayStatus: ParsePayStatusType = {
  waitForPaid: "결제대기",
  paid: "결제완료",
  cancelRequest: "취소요청",
  cancelCompleted: "취소완료",
};

const payStatusColor: ParsePayStatusType = {
  결제대기: "rgba(253, 215, 81, 0.88)",
  결제완료: "#74D186",
  취소요청: "rgba(244, 44, 16, 0.51)",
  취소완료: "#C4C4C4",
};

const ResultItem: FunctionComponent<ResultItemProps> = (props) => {
  const { itemHeight, payID, payStatus, payDate, plateNum, payPrice } = props;
  const payStatusKo = parsePayStatus[payStatus];
  const toDateType = new Date(payDate.replace(/-/g, "/"));
  const refinedYear = toDateType.getFullYear().toString().substr(2, 2);
  const refinedMonth =
    (toDateType.getMonth() + 1).toString().length > 1
      ? toDateType.getMonth() + 1
      : `0${toDateType.getMonth() + 1}`;
  const refinedDate =
    toDateType.getDate().toString().length > 1
      ? toDateType.getDate()
      : `0${toDateType.getDate()}`;
  const dateInForm = `${refinedYear}. ${refinedMonth}. ${refinedDate}`;

  return (
    <ResultItemBox itemHeight={itemHeight}>
      <div>
        <StyledPayStatus color={payStatusColor[payStatusKo]}>
          {payStatusKo}
        </StyledPayStatus>
      </div>
      <div>{dateInForm}</div>
      <div>{plateNum}</div>
      <div>{payPrice}</div>
      <div>
        <Link to={`/pay/${payID}`} state={props}>
          <span>상세</span>
          <img src={bracketRight} alt="bracket Right"></img>
        </Link>
      </div>
    </ResultItemBox>
  );
};

export default ResultItem;

//styled-components
const ResultItemBox = styled.div<{ itemHeight: number }>`
  height: ${(props) => props.itemHeight}px;
  display: flex;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.9rem;
  padding: 1rem 0;
  border-bottom: 0.07rem solid var(--lightGray);

  > div {
    flex-grow: 1;
    text-align: center;
    padding: 0.25rem;

    :first-child {
      width: 6.5rem;
      padding-top: 0;
      padding-bottom: 0;
    }

    :nth-of-type(2) {
      width: 7rem;
    }

    :nth-of-type(3) {
      width: 8rem;
    }

    :nth-of-type(4) {
      width: 4.5rem;
    }

    :last-child {
      width: 4rem;
    }
  }

  a {
    text-decoration: none;
  }

  img {
    width: 0.6rem;
    height: 1rem;
    margin-left: 0.2rem;
    padding-top: 0.1rem;
  }
`;

const StyledPayStatus = styled.div`
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
