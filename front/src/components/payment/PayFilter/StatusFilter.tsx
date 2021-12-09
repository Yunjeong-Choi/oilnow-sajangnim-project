import { FunctionComponent, MouseEvent, useState } from "react";
import styled from "styled-components";
import { parsePayStatus } from "../PayResult/ResultItem";

// const statusList = ["결제대기", "결제완료", "취소요청", "취소완료"];
const statusList = Object.entries(parsePayStatus);

interface StatusFilterProps {
  payStatusKeyword?: string;
  setPayStatusKeyword: (param?: string) => void;
}

const StatusFilter: FunctionComponent<StatusFilterProps> = ({
  payStatusKeyword,
  setPayStatusKeyword,
}) => {
  // const [clickedValue, setClickedValue] = useState<string>();

  const handlePayStatusClick = (event: MouseEvent<HTMLButtonElement>) => {
    const curPayStatus = event.currentTarget.value;
    if (payStatusKeyword === curPayStatus) {
      setPayStatusKeyword(undefined); //이게 안먹혔던 이유는? return을 해주지 않았기 때문
      return;
    }
    setPayStatusKeyword(curPayStatus);
    //TODO: status 조건을 여러개 걸 수 있도록 하려면 추가 작업이 필요함
  };

  return (
    <StatusFilterBox>
      {statusList.map((status) => (
        <StatusButton
          key={status[0]}
          value={status[0]}
          clickedValue={payStatusKeyword}
          onClick={handlePayStatusClick}
        >
          {status[1]}
        </StatusButton>
      ))}
    </StatusFilterBox>
  );
};

export default StatusFilter;

//styled-components
const StatusFilterBox = styled.div`
  display: flex;
  height: 3rem;
`;

const StatusButton = styled.button<{ clickedValue: string | undefined }>`
  font-weight: ${(props) =>
    props.value === props.clickedValue ? "bold" : "normal"};
  color: ${(props) =>
    props.value === props.clickedValue
      ? "var(--oilBlue)"
      : "var(--borderGray)"};
  border-color: ${(props) =>
    props.value === props.clickedValue
      ? "var(--oilBlue)"
      : "var(--borderGray)"};
  border: 0.07rem solid;
  border-radius: 2rem;
  background-color: white;
  flex-grow: 1;
  margin-right: 1rem;

  :last-child {
    margin-right: 0;
  }
`;
