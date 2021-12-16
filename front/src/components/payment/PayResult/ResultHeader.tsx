import styled from "styled-components";
// import arrowDown from "../../../assets/images/arrowDown-icon.png";

const colTitleList = ["결제상태", "날짜", "차량번호", "금액"];

const ResultHeader = () => {
  return (
    <ResultHeaderBox>
      {colTitleList.map((title) => (
        <div key={title}>{title}</div>
      ))}
      <div>
        상세보기
        {/* <select>
          <option>최신순</option>
          <option>오래된순</option>
        </select> */}
      </div>
    </ResultHeaderBox>
  );
};

export default ResultHeader;

//styled-components
const ResultHeaderBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem 1rem 0;
  border-bottom: 0.07rem solid var(--borderGray);

  > div {
    flex-grow: 1;
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.7rem;

    :first-child {
      width: 6.5rem;
    }

    :nth-of-type(2) {
      width: 7rem;
    }

    :nth-of-type(3) {
      width: 8rem;
    }

    :nth-of-type(4) {
      width: 4.5rem;
    }

    :last-child {
      width: 5rem;
      padding: 0 0.5rem;
    }
  }

  select {
    width: 100%;
    max-width: 10rem;
    height: 2rem;
    margin-top: 0.1rem;
    padding-top: 0.125em;
    background-image: url("../../../assets/images/arrowDown-icon.png") no-repeat
      95% 50%;
    /* TODO: 하... 왜 배경에 안먹니... */
    /* background-color: transparent; */
    /* background-repeat: no-repeat; */
    /* background-size: 90%; */
    /* background-position: 97% 50%/15px auto; */
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.7rem;
    border: 0.07rem solid var(--borderGray);
    border-radius: 0.4rem;
  }
`;
