import { FunctionComponent } from "react";
import styled from "styled-components";
import ResultHeader from "./ResultHeader";
import ResultList from "./ResultList(virtualList)";

interface PayResultProps {
  startDate?: Date;
  endDate?: Date;
  payStatusKeyword: string | undefined;
  plateNumKeyword: string | undefined;
}

const PayResult: FunctionComponent<PayResultProps> = ({
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
  flex-direction: column;
`;
