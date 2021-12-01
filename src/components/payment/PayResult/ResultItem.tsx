import { FunctionComponent } from "react";
import styled from "styled-components";
import bracketRight from "../../../assets/images/bracketRight-icon.png";
import { Link } from "react-router-dom";

//TODO: 타입스크립트에서 타입을 정의하는 방식은?
interface itemValueType {
  payID: number;
  payStatus: string;
  payDate: string;
  plateNum: string;
  payPrice: number;
}

interface ResultItemProps {
  itemValue: itemValueType;
}

const ResultItem: FunctionComponent<ResultItemProps> = ({ itemValue }) => {
  const { payID, payStatus, payDate, plateNum, payPrice } = itemValue;
  return (
    <ResultItemBox>
      <StyledPayStatus>{payStatus}</StyledPayStatus>
      <div>{payDate}</div>
      <div>{plateNum}</div>
      <div>{payPrice}</div>
      <div>
        <Link to={`/pay/${payID}`}>
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

  img {
    width: 0.6rem;
    height: 1rem;
    margin-left: 0.2rem;
    padding-top: 0.1rem;
  }
`;

const StyledPayStatus = styled.div`
  background-color: rgba(253, 215, 81, 0.88);
  border-radius: 1.5rem;
`;
