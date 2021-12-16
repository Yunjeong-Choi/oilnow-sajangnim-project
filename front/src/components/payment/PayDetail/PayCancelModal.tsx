import { FunctionComponent } from "react";
import styled from "styled-components";

interface PayCancelModalProps {
  setIsCancelModalOpen: (param: boolean) => void;
}

const PayCancelModal: FunctionComponent<PayCancelModalProps> = ({
  setIsCancelModalOpen,
}) => {
  return (
    <PayCancelModalBG>
      {/* TODO: 빈 공간을 누르면 모달이 닫히도록 */}
      <ModalContentBox>
        <ContentText>
          <span>정말 결제를 취소하시겠습니까?</span>
          <div>
            취소가 확정된 이후에는 되돌릴 수 없습니다.
            <br />
            취소사유를 선택해주세요.
            <span>(필수사항)</span>
          </div>
          <select>
            <option>취소사유를 선택해주세요.</option>
            <option>다른 결제 수단으로 다시 결제</option>
            <option>시스템 오류</option>
            <option>기타 사유</option>
          </select>
        </ContentText>
        <ProcessOptions>
          <button onClick={() => setIsCancelModalOpen(false)}>돌아가기</button>
          <button>취소확정</button>
        </ProcessOptions>
      </ModalContentBox>
    </PayCancelModalBG>
  );
};

export default PayCancelModal;

//styled-components
const PayCancelModalBG = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(196, 196, 196, 0.5);
  display: flex;
  align-items: center;
`;

const ModalContentBox = styled.div`
  width: 100%;
  height: 35%;
  background-color: white;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
`;

const ContentText = styled.div`
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > span {
    font-weight: bold;
    font-size: 2.4rem;
    line-height: 3.5rem;
  }

  div {
    font-size: 1.3rem;
    line-height: 1.9rem;

    span {
      font-size: 1rem;
      line-height: 1.4rem;
      color: var(--red);
    }
  }

  select {
    width: 70%;
    height: 3rem;
    padding: 0 1em;
    border-radius: 0.4rem;
  }
`;

const ProcessOptions = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 48%;
    color: white;
    border: none;
    border-radius: 0.4rem;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.6rem;
    padding: 0.3em 0 0.2em 0;

    :first-child {
      background-color: var(--gray);
    }

    :last-child {
      background-color: var(--red);
    }
  }
`;
