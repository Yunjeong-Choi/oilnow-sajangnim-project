import { FunctionComponent } from "react";
import styled from "styled-components";
import bracketRight from "../../../assets/images/bracketRight-icon.png";
import { Link } from "react-router-dom";
import { PayDataListProps } from "./ResultList(virtualList)";

// type PayStatusKey =
//   | "waitForPaid"
//   | "paid"
//   | "cancelRequest"
//   | "cancelCompleted";
// type PayStatusKoValue = "결제대기" | "결제완료" | "취소요청" | "취소완료";
// interface ParsePayStatusType {
//   [key in PayStatusKey]: PayStatusKoValue;
// }
//TODO: 이건 왜 안될까요...
//in은 내부에 있는 모든 타입을 가져온다. (자바스크립트의 문법)
//record를 쓰는게 더 가독성이 있음

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

interface ResultItemProps extends PayDataListProps {
  itemHeight: number;
}

const ResultItem: FunctionComponent<ResultItemProps> = (props) => {
  const { itemHeight, payID, payStatus, payDate, plateNum, payPrice } = props;
  const payStatusKo = parsePayStatus[payStatus];
  const toDateType = new Date(payDate);
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
  // console.log(payDate, Number(new Date(payDate)));
  // dns-date
  // const dateformat = require("dateformat"); //TODO: 이거.. 써도 되는건가...? ㄴ
  // -> date-fns
  // dateformat(typeOfDate, "yy. mm. dd");

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
          {/* <Link to={{ pathname: `/pay/${payID}`, state: { ...itemValue } }}> */}
          {/* 쿼리스트링, 쿼리파람 등을 사용할 수 있으나 비추, 길이에 제한이 있고,  */}
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
