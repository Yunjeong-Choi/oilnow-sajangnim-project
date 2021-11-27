import styled from "styled-components";
import ResultListHeader from "./ResultListHeader";
import ResultList from "./ResultList";

const PayResult = () => {
  return (
    <PayResultBox>
      <ResultListHeader />
      <ResultList />
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
