import { Dispatch, FunctionComponent, MouseEvent, SetStateAction } from "react";
import styled from "styled-components";

const statusList = ["결제대기", "결제완료", "취소요청", "취소완료"];

interface statusFilterProps {
  setPayStatusKeyword: Dispatch<SetStateAction<string | undefined>>;
}

const StatusFilter: FunctionComponent<statusFilterProps> = ({
  setPayStatusKeyword,
}) => {
  const handlePayStatusClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    // const clickValue = event.target.value;
    // setPayStatusKeyword(clickValue);
  };
  //TODO: 버튼의 값을 찾지 못함...

  return (
    <StatusFilterBox>
      {statusList.map((status) => (
        <button key={status} value={status} onClick={handlePayStatusClick}>
          {status}
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
