import { FunctionComponent } from "react";
import styled from "styled-components";
import bracketRight from "../../../assets/images/bracketRight-icon.png";
import { Link } from "react-router-dom";
import { payDataListProps } from "./ResultList";

// type PayStatusKey =
//   | "waitForPaid"
//   | "paid"
//   | "cancelRequest"
//   | "cancelCompleted";
// type PayStatusKoValue = "결제대기" | "결제완료" | "취소요청" | "취소완료";
// interface parsePayStatusType {
//   [key in PayStatusKey]: PayStatusKoValue;
// }
//TODO: 이건 왜 안될까요...
//in은 내부에 있는 모든 타입을 가져온다. (자바스크립트의 문법)
//record를 쓰는게 더 가독성이 있음

interface parsePayStatusType {
  [key: string]: string;
}

export const parsePayStatus: parsePayStatusType = {
  waitForPaid: "결제대기",
  paid: "결제완료",
  cancelRequest: "취소요청",
  cancelCompleted: "취소완료",
};

const payStatusColor: parsePayStatusType = {
  결제대기: "rgba(253, 215, 81, 0.88)",
  결제완료: "#74D186",
  취소요청: "rgba(244, 44, 16, 0.51)",
  취소완료: "#C4C4C4",
};

// const parsePayStatus: parsePayStatusType = {
//   waitForPaid: { ko: "결제대기", co: "red" },
//   paid: { ko: "결제완료", co: "yellow" },
//   cancelRequest: { ko: "취소요청", co: "blue" },
//   cancelCompleted: { ko: "취소완료", co: "green" },
// };

// interface ResultItemProps {
//   payID: number;
//   payStatus: string;
//   payDate: string;
//   plateNum: string;
//   payPrice: number;
// }

const ResultItem: FunctionComponent<payDataListProps> = (props) => {
  const { payID, payStatus, payDate, plateNum, payPrice } = props;
  const payStatusKo = parsePayStatus[payStatus];

  return (
    <ResultItemBox>
      <StyledPayStatus color={payStatusColor[payStatusKo]}>
        {payStatusKo}
      </StyledPayStatus>
      <div>{payDate}</div>
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
const ResultItemBox = styled.div`
  display: flex;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.9rem;
  padding: 1rem 0;
  border-bottom: 0.07rem solid var(--lightGray);

  div {
    flex-grow: 1;
    width: 6.5rem;
    text-align: center;
    padding: 0.5rem 0;
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
  background-color: ${(props) => props.color};
  border-radius: 1.5rem;
`;
