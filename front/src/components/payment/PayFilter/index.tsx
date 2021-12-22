import styled from "styled-components";
import DateFilter from "./DateFilter";
import StatusFilter from "./StatusFilter";
import PlateNumFilter from "./PlateNumFilter";
import { FunctionComponent } from "react";

interface PayFilterProps {
  startDate?: Date;
  setStartDate: (param?: Date) => void;
  endDate?: Date;
  setEndDate: (param?: Date) => void;
  payStatusKeyword?: string;
  setPayStatusKeyword: (param?: string) => void;
  setPlateNumKeyword: (param?: string) => void;
}

const PayFilter: FunctionComponent<PayFilterProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  payStatusKeyword,
  setPayStatusKeyword,
  setPlateNumKeyword,
}) => {
  return (
    <PayFilterBox>
      <span>검색 필터</span>
      <DateFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <StatusFilter
        payStatusKeyword={payStatusKeyword}
        setPayStatusKeyword={setPayStatusKeyword}
      />
      <PlateNumFilter setPlateNumKeyword={setPlateNumKeyword} />
    </PayFilterBox>
  );
};

export default PayFilter;

//styled-components
const PayFilterBox = styled.div`
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: space-between;
  -webkit-justify-content: space-between;
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
