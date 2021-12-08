import styled from "styled-components";
import ResultItem from "./ResultItem";
import { FunctionComponent, useEffect, useState, useCallback } from "react";
import fetchData from "../../../api/fetchData";
import useScroll from "../../../hooks/useScroll";

//TODO: 타입만 따로 모아서 저장하기도 하나요..? 그렇다면 파일명을 how?

export interface payDataListProps {
  payID: number;
  payStatus: string;
  payDate: string;
  plateNum: string;
  payPrice: number;
  orderDetail: string;
  cancelReason: string;
  cancelImgURL: string;
  cancelClaim: string;
}

// interface responseType {
//   payData: [];
// }

interface ResultListProps {
  payStatusKeyword: string | undefined;
  plateNumKeyword: string | undefined;
}

const itemHeight = 45;
const itemViewPortCount = 10;
const itemPaddingCount = 10;
const itemInitialTotal = itemViewPortCount + itemPaddingCount;
const scrollViewPortHeight = 490;
// TODO: 반응형으로 높이조절 어떻게 할까

const ResultList: FunctionComponent<ResultListProps> = ({
  payStatusKeyword,
  plateNumKeyword,
}) => {
  const [scrollTop, scrollContainerRef] = useScroll();
  const [page, setPage] = useState<number>(0);
  const [list, setList] = useState<payDataListProps[]>([]);
  const [filteredList, setFilteredList] = useState<payDataListProps[]>([]);

  const totalItemCount = Math.max(list.length, itemInitialTotal);
  const containerHeight = Math.max(
    scrollViewPortHeight,
    itemHeight * totalItemCount
  );
  //SCROLLTOP
  // const startIndex = Math.max(
  //   Math.floor(scrollTop / itemHeight) - itemPaddingCount,
  //   0
  // );
  // const visibleNodes = list.slice(
  //   startIndex,
  //   startIndex +
  //     Math.floor(scrollViewPortHeight / itemHeight) +
  //     2 * itemPaddingCount
  // );
  // const offsetY = startIndex * itemHeight;

  const getData = useCallback(async () => {
    try {
      const data = await fetchData();
      const { payData } = data;
      setList(payData);
      console.log(payData);
    } catch (e) {
      console.error(e);
    }
  }, []);

  //getData를 실행시키는 부분
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    //TODO: 이건 왜 필요했던 걸까
    // if (plateNumKeyword.length === 0) {
    //   setFilteredList([]);
    //   return;
    // }

    const filteredList = list.filter(
      // if (typeof plateNumKeyword === "undefined") return;
      // 얼리리턴을 해도 되지만 아래처럼 하는게 더 간결함
      (item) =>
        plateNumKeyword !== undefined &&
        item.plateNum.includes(plateNumKeyword) &&
        item.payStatus === payStatusKeyword //TODO: 둘중 하나만 조건이 걸렸을때는 어떻게 처리 할것인지 지정을 해줘야 함
    );
    console.log(filteredList, plateNumKeyword, payStatusKeyword);
    setFilteredList(filteredList);
  }, [plateNumKeyword, payStatusKeyword]);
  //띄어쓰기를 무시한 검색이 가능하도록 하려면 공수가 많이 듬. 주소검색은 분류가 명확하니까 괜찮지만
  //한글자씩 검색해서 결과를 추려나갈수도 있음
  //공수를 들이는 만큼 효용이 있는가, 선택의 문제

  //SCROLLTOP
  // useEffect(() => {
  //   const BUFFER_AREA = scrollViewPortHeight / 3;
  //   if (scrollTop + scrollViewPortHeight >= containerHeight - BUFFER_AREA) {
  //     setPage(page + 1);
  //   }
  // }, [scrollTop]);

  return (
    //SCROLLTOP
    // <ResultListBox ref={scrollContainerRef} height={scrollViewPortHeight}>
    <ResultListBox height={scrollViewPortHeight}>
      <TotalItemBox height={containerHeight}>
        {/* SCROLLTOP */}
        {/* <div
          style={{
            position: "absolute",
            width: "100%",
            transform: `translateY(${offsetY}px)`,
          }}
        > */}
        {(filteredList.length > 0 ? filteredList : list).map((item) => (
          <ResultItem key={item.payID} {...item} />
        ))}
        {/* </div> */}
      </TotalItemBox>
    </ResultListBox>
  );
};

export default ResultList;

//styled-components

// interface ResultListBoxProps {
//   pHeight: number;
//   overflowY: string
// }
//타입에 쉼표가 자꾸 세미콜론으로 바뀜 -> 인터페이스로 지정한다. 린트때문인듯
const ResultListBox = styled.div<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  /*높이가 안 먹히고 있음 -> 단위 인식을 못하는 것으로 추측 */
  overflow-y: auto; //하위 요소가 부모요소를 넘어서면 스크롤이 생기도록
  padding-right: 1.2rem;
`;

const TotalItemBox = styled.div<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  position: "relative";
`;
