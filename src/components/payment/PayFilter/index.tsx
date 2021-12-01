import styled from "styled-components";
import DateFilter from "./DateFilter";
import StatusFilter from "./StatusFilter";
import PlateNumFilter from "./PlateNumFilter";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface PayFilterProps {
  setPayStatusKeyword: Dispatch<SetStateAction<string | undefined>>;
  setPlateNumKeyword: Dispatch<SetStateAction<string | undefined>>;
}

const PayFilter: FunctionComponent<PayFilterProps> = ({
  setPayStatusKeyword,
  setPlateNumKeyword,
}) => {
  return (
    <PayFilterBox>
      <span>검색 필터</span>
      <DateFilter />
      <StatusFilter setPayStatusKeyword={setPayStatusKeyword} />
      <PlateNumFilter setPlateNumKeyword={setPlateNumKeyword} />
    </PayFilterBox>
  );
};

export default PayFilter;

//styled-components
const PayFilterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem;
  background-color: white;

  span {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.6rem;
  }

  > div {
    margin: 0.5rem 0;
  }
`;
