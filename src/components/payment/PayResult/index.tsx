import { FunctionComponent } from "react";
import styled from "styled-components";
import ResultHeader from "./ResultHeader";
import ResultList from "./ResultList";

interface PayResultProps {
  filterKeyword: string | undefined;
}

const PayResult: FunctionComponent<PayResultProps> = ({ filterKeyword }) => {
  return (
    <PayResultBox>
      <ResultHeader />
      <ResultList filterKeyword={filterKeyword} />
    </PayResultBox>
  );
};

export default PayResult;

//styled-components
const PayResultBox = styled.div`
  margin-top: 1rem;
  background-color: white;
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
