import styled from "styled-components";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { FunctionComponent, useState } from "react";

registerLocale("ko", ko);
setDefaultLocale("ko");

// type DateProps = Date | null;

interface DateFilterProps {
  startDate?: Date;
  setStartDate: (param?: Date) => void;
  endDate?: Date;
  setEndDate: (param?: Date) => void;
}

const DateFilter: FunctionComponent<DateFilterProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  // const [startDate, setStartDate] = useState<DateProps>();
  // const [endDate, setEndDate] = useState<DateProps>();

  return (
    <DateFilterBox>
      <div>
        <StyledDatePicker
          dateFormat="yyyy.MM.dd (eee)"
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            console.log(date);
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="시작 날짜"
        />
      </div>
      <span>~</span>
      <div>
        <StyledDatePicker
          dateFormat="yyyy.MM.dd (eee)"
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="종료 날짜"
        />
      </div>
      {/* TODO: startDate가 기존에 선택된 endDate보다 뒤의 날짜가 된다면 endDate는 리셋되도록 */}
      {/* TODO: onClickOutside로 캘린더를 닫을 수 있음 */}
      {/* TODO: 달력이미지는 custom input으로 해결하면 될듯 */}
      {/* TODO: 헤더의 날짜 형식을 바꾸려면 custom header를 넣어줘야 함 */}
      <button>적용</button>
    </DateFilterBox>
  );
};

export default DateFilter;

//styled-components
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem 1rem;
  height: 100%;
  background: #ffffff;
  border: 0.07rem solid var(--borderGray);
  border-radius: 0.4rem;
`;

const DateFilterBox = styled.div`
  display: flex;
  height: 3rem;
  text-align: center;

  span {
    flex-grow: 0;
    padding: 0 0.5rem;
  }

  > div {
    flex-grow: 1;
  }

  > button {
    flex-grow: 0.2;
    min-width: 5rem;
    margin-left: 1rem;
    background: var(--gray);
    font-weight: bold;
    font-size: 1.2rem;
    color: white;
    border: none;
    border-radius: 0.4rem;
    padding: 0 0.7em;
  }
`;
