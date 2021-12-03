import { Dispatch, FunctionComponent, MouseEvent, SetStateAction } from "react";
import styled from "styled-components";
import { parsePayStatus } from "../PayResult/ResultItem";

// const statusList = ["결제대기", "결제완료", "취소요청", "취소완료"];
const statusList = Object.entries(parsePayStatus);

interface statusFilterProps {
  setPayStatusKeyword: (param?: string) => void;
}

const StatusFilter: FunctionComponent<statusFilterProps> = ({
  setPayStatusKeyword,
}) => {
  const handlePayStatusClick = (event: MouseEvent<HTMLButtonElement>) => {
    const clickValue = event.currentTarget.value;
    setPayStatusKeyword(clickValue);
  };

  return (
    <StatusFilterBox>
      {statusList.map((status) => (
        <button
          key={status[0]}
          value={status[0]}
          onClick={handlePayStatusClick}
        >
          {status[1]}
        </button>
      ))}
    </StatusFilterBox>
  );
};

export default StatusFilter;

//styled-components
const StatusFilterBox = styled.div`
  display: flex;
  height: 3rem;

  button {
    background-color: white;
    border: 0.07rem solid var(--borderGray);
    border-radius: 2rem;
    flex-grow: 1;
    margin-right: 1rem;
  }

  button:last-child {
    margin-right: 0;
  }
`;
