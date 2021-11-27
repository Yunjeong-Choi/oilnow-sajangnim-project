import styled from "styled-components";
import { FunctionComponent } from "react";

interface ContainerLayoutProps {
  titleName: string;
}

const ContainerLayout: FunctionComponent<ContainerLayoutProps> = ({
  titleName,
  children,
}) => {
  return (
    <>
      <HeaderLayout>
        <div>
          <button>메뉴</button>
          <span>{titleName}</span>
        </div>
        <div>
          <button>알림</button>
          <button>견적서</button>
        </div>
      </HeaderLayout>
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default ContainerLayout;

// styled-components
const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1.8rem 1.2rem;

  div {
    display: flex;
  }

  span {
    font-weight: bold;
    font-size: 2.8rem;
    line-height: 4.1rem;
    margin-left: 1rem;
  }

  button {
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 2rem;
    padding: 0.8rem 1.1rem;
    background-color: var(--lightGray);
    border-radius: 1.8rem;
    border: none;
  }

  button:last-child {
    margin-left: 1rem;
    padding: 0.8rem 2rem;
    color: white;
    background-color: var(--oilBlue);
  }

  //TODO: 왜 안되는지 알수가 없음.....
  /* button:nth-child(2) {
    background: red;
    margin-left: auto;
  } */
`;

const MainLayout = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: var(--lightGray);
`;
