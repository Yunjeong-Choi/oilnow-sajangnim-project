import styled from "styled-components";
import bracketRight from "../../../assets/images/bracketRight-icon.png";

const ResultList = () => {
  return (
    <ResultListBox>
      <ResultListItemBox>
        <StyledPayStatus>결제상태</StyledPayStatus>
        <div>날짜</div>
        <div>55 바 5555</div>
        <div>50,000</div>
        <div>
          <span>상세</span>
          <img src={bracketRight} alt="bracket Right"></img>
        </div>
      </ResultListItemBox>
    </ResultListBox>
  );
};

export default ResultList;

//styled-components
const ResultListBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultListItemBox = styled.div`
  display: flex;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.9rem;
  padding: 1rem 0;
  border-bottom: 0.07rem solid var(--lightGray);

  div {
    flex-grow: 1;
    width: 6.5rem;
    text-align: center;
    padding: 0.5rem 0;
  }

  img {
    width: 0.6rem;
    height: 1rem;
    margin-left: 0.2rem;
    padding-top: 0.1rem;
  }
`;

const StyledPayStatus = styled.div`
  background-color: rgba(253, 215, 81, 0.88);
  border-radius: 1.5rem;
`;
