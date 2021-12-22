import styled from "styled-components";
import {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import SideMenu from "./SideMenu";

interface ContainerLayoutProps {
  titleName: string;
}

const ContainerLayout: FunctionComponent<ContainerLayoutProps> = ({
  titleName,
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      {/* {isMenuOpen ? <SideMenu setIsMenuOpen={setIsMenuOpen} /> : null} */}
      <HeaderLayout>
        <div>
          <SideMenu />
          {/* <HeaderBtn onClick={() => setIsMenuOpen(!isMenuOpen)}>메뉴</HeaderBtn> */}
          <HeaderTitle>{titleName}</HeaderTitle>
        </div>
        <div>
          <HeaderBtn>알림</HeaderBtn>
          <EstimateBtn>견적서</EstimateBtn>
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
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  padding: 1.8rem 1.2rem;

  > div {
    display: flex;
    display: -webkit-flex;
  }
`;

const HeaderTitle = styled.span`
  font-weight: bold;
  font-size: 2.8rem;
  line-height: 4.1rem;
  margin-left: 1rem;
`;

export const HeaderBtn = styled.button`
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 0.8rem 1.1rem;
  background-color: var(--lightGray);
  border-radius: 1.8rem;
  border: none;
  cursor: pointer;
`;

const EstimateBtn = styled(HeaderBtn)`
  margin-left: 1rem;
  padding: 0.8rem 2rem;
  color: white;
  background-color: var(--oilBlue);
`;

export const MainLayout = styled.main`
  flex-grow: 1;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  background: var(--lightGray);
`;
