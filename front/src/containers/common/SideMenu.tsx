import { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import KakaoTalk from "../../assets/images/kakaoTalk-icon.png";
import { HeaderBtn } from "./ContainerLayout";

// interface SideMenuProps {
//   setIsMenuOpen: (param: boolean) => void;
// }

// const SideMenu = ({ setIsMenuOpen }: SideMenuProps) => {
const SideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const sideMenuContainerRef = useRef<HTMLDivElement>(null);
  const sideMenuBGRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sideMenuContainerRef || !sideMenuContainerRef.current) return;
    if (!menuListRef || !menuListRef.current) return;
    if (!sideMenuBGRef || !sideMenuBGRef.current) return;

    // sideMenuContainerRef.current.style.display = isMenuOpen
    //   ? "inline-block"
    //   : "none";
    sideMenuContainerRef.current.style.visibility = isMenuOpen
      ? "visible"
      : "hidden";
    sideMenuBGRef.current.style.opacity = isMenuOpen ? "1" : "0";
    menuListRef.current.style.opacity = isMenuOpen ? "1" : "0";
    menuListRef.current.style.transform = `translateX(-${
      isMenuOpen ? 0 : 1
    }00%)`;
  }, [isMenuOpen]);

  return (
    <>
      <HeaderBtn onClick={() => setIsMenuOpen(!isMenuOpen)}>메뉴</HeaderBtn>
      <SideMenuContainer ref={sideMenuContainerRef}>
        <SideMenuBG
          isMenuOpen={isMenuOpen}
          ref={sideMenuBGRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></SideMenuBG>
        <MenuList ref={menuListRef}>
          <MenuTitleClose onClick={() => setIsMenuOpen(!isMenuOpen)}>
            X
          </MenuTitleClose>
          <MenuCategory>
            <span>결제</span>
            <a href="/">
              결제관리
              <span>open!</span>
            </a>
            <div>매출조회</div>
            <div>정산관리</div>
          </MenuCategory>
          <MenuCategory>
            <span>주유소</span>
            <div>기본정보관리</div>
            <div>상품관리</div>
            <div>결제설정</div>
            <div>리뷰관리</div>
          </MenuCategory>
          <MenuCategory>
            <span>설정</span>
            <div>개인정보관리</div>
            <div>알림설정</div>
            <div>권한설정</div>
            <div>로그아웃</div>
          </MenuCategory>
          <OilnowKakao>
            <button>
              <img src={KakaoTalk} alt="Kakao Talk" />
              오일나우 문의하기
            </button>
            <div>||운영시간||</div>
            <div>월~금 10:00~18:00</div>
            <div>(주말, 공휴일 휴무)</div>
          </OilnowKakao>
        </MenuList>
      </SideMenuContainer>
    </>
  );
};

export default SideMenu;

//styled-components
const SideMenuContainer = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
`;

const SideMenuBG = styled.div<{ isMenuOpen: boolean }>`
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(196, 196, 196, 0.5);
  transition: all 0.5s ease-out;
`;

const MenuList = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: white;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  font-weight: 500;
  height: 100%;
  width: 30%;
  min-width: 22rem;
  padding: 1rem 2rem;
  transition: all 0.8s ease-out;
`;

const MenuCategory = styled.div`
  flex-grow: 1;
  padding: 1rem 0;
  border-top: 0.07rem solid var(--borderGray);
  display: flex;
  flex-direction: column;

  > span {
    font-weight: bold;
    font-size: 2.2rem;
    line-height: 3.2rem;
    margin-left: 0;
    padding: 0.2em 0;
  }

  > a,
  div {
    text-decoration: none;
    font-size: 1.6rem;
    line-height: 2.3rem;
    padding: 0.2em 0;

    > span {
      border: none;
      border-radius: 2rem;
      color: white;
      background: mediumseagreen;
      margin: 0 1rem;
      padding: 0 0.7rem;
      font-size: 1.5rem;
    }
  }
  > a:hover {
    text-decoration: underline;
  }
`;

const MenuTitleClose = styled(MenuCategory)`
  font-weight: bold;
  font-size: 3rem;
  line-height: 4rem;
  border: none;
  cursor: pointer;
`;

const OilnowKakao = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  > button {
    border: 0.07rem solid var(--borderGray);
    border-radius: 2rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.7rem;
    line-height: 2.3rem;
    margin: 1rem 0;
    font-weight: 500;

    > img {
      width: 18%;
      margin-top: 0.3rem;
    }
  }

  > div {
    font-size: 1.4rem;
    line-height: 1.7rem;
  }
`;
