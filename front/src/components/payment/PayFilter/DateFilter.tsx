import styled from "styled-components";

const DateFilter = () => {
  return (
    <DateFilterBox>
      <div>StartDate</div>
      <span>~</span>
      <div>EndDate</div>
      <button>적용</button>
    </DateFilterBox>
  );
};

export default DateFilter;

//styled-components
const DateFilterBox = styled.div`
  display: flex;
  height: 3rem;
  text-align: center;

  span {
    flex-grow: 0;
    padding: 0 0.5rem;
  }

  div {
    flex-grow: 1;
    background: #ffffff;
    border: 0.07rem solid var(--borderGray);
    border-radius: 0.4rem;
  }

  button {
    flex-grow: 0.2;
    margin-left: 1rem;
    background: var(--gray);
    font-weight: bold;
    font-size: 1.2rem;
    color: white;
    border: none;
    border-radius: 0.4rem;
    padding: 0 1rem;
  }
`;
