import { FunctionComponent } from "react";
import styled from "styled-components";
import ResultHeader from "./ResultHeader";
import ResultList from "./ResultList(사용중, VirtualList)";
import { FilterValueProps } from "./model";

const PayResult: FunctionComponent<FilterValueProps> = ({
  startDate,
  endDate,
  payStatusKeyword,
  plateNumKeyword,
}) => {
  return (
    <PayResultBox>
      <ResultHeader />
      <ResultList
        startDate={startDate}
        endDate={endDate}
        payStatusKeyword={payStatusKeyword}
        plateNumKeyword={plateNumKeyword}
      />
    </PayResultBox>
  );
};

export default PayResult;

//styled-components
const PayResultBox = styled.div`
  margin-top: 1rem;
  background-color: white;
  padding: 1rem;
  padding-top: 1.5rem;
  flex-grow: 1;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
`;
