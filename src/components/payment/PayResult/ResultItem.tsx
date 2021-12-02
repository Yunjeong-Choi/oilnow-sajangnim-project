import { FunctionComponent } from "react";
import styled from "styled-components";
import bracketRight from "../../../assets/images/bracketRight-icon.png";
import { Link } from "react-router-dom";

interface ResultItemProps {
  payID: number;
  payStatus: string;
  payDate: string;
  plateNum: string;
  payPrice: number;
}

const ResultItem: FunctionComponent<ResultItemProps> = (props) => {
  const { payID, payStatus, payDate, plateNum, payPrice } = props;

  return (
    <ResultItemBox>
      <StyledPayStatus>{payStatus}</StyledPayStatus>
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
