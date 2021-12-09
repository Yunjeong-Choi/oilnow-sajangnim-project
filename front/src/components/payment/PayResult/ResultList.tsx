import styled from "styled-components";
import ResultItem from "./ResultItem";
import { FunctionComponent, useEffect, useState, useCallback } from "react";
import fetchData from "../../../api/fetchData";
import useScroll from "../../../hooks/useScroll";

//TODO: 타입만 따로 모아서 저장하기도 하나..? 그렇다면 파일명을 how?
// model.ts OR types 폴더의 파일명.d.ts (파일단위로)

//TODO: 타입은 모두 대문자로
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

interface ResultListProps {
  startDate?: Date;
  endDate?: Date;
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
  startDate,
  endDate,
  payStatusKeyword,
  plateNumKeyword,
}) => {
  const { scrollTop, scrollContainerRef } = useScroll();
  const [page, setPage] = useState<number>(0);
  const [list, setList] = useState<payDataListProps[]>([]); //filteredList가 주로 사용된다 하더라도 원본 데이터는 유지되어야 함
  const [filteredList, setFilteredList] = useState<payDataListProps[]>([]);

  const totalItemCount = Math.max(list.length, itemInitialTotal);
  const containerHeight = Math.max(
    scrollViewPortHeight,
    itemHeight * totalItemCount
  );
  const startIndex = Math.max(
    Math.floor(scrollTop / itemHeight) - itemPaddingCount,
    0
  );
  const visibleNodes = list.slice(
    startIndex,
    startIndex +
      Math.floor(scrollViewPortHeight / itemHeight) +
      2 * itemPaddingCount
  );
  const offsetY = startIndex * itemHeight;

  const getData = useCallback(async () => {
    try {
      const data = await fetchData();
      const { payData } = data;
      setList(payData);
      setFilteredList(payData);
    } catch (e) {
      console.error(e);
    }
  }, []);

  //getData를 실행시키는 부분
  useEffect(() => {
    getData();
    // 만약 무한스크롤이 fire 되는 순간 payStatusKeyword와 같은 필터 조건을 다시 콜해줘야 함.
    // filterPlateNumKeyword();
  }, []);

  const filterData = () => {
    const filteredList = list.reduce<payDataListProps[]>((acc, cur) => {
      const payStatusKeywordCondition = payStatusKeyword
        ? cur.payStatus === payStatusKeyword
        : true;
      const payNumKeywordCondition =
        plateNumKeyword && plateNumKeyword.length > 0
          ? cur.plateNum.includes(plateNumKeyword)
          : true;
      const startDateCondition = startDate
        ? startDate.getTime() - new Date(cur.payDate).getTime() <= 0
        : true;
      const endDateCondition = endDate
        ? endDate.getTime() - new Date(cur.payDate).getTime() >= 0
        : true;

      if (
        payStatusKeywordCondition &&
        payNumKeywordCondition &&
        startDateCondition &&
        endDateCondition
      ) {
        acc.push(cur);
      }
      return acc;
    }, []);

    setFilteredList(filteredList);
  };

  useEffect(() => {
    filterData();
  }, [payStatusKeyword, plateNumKeyword, startDate, endDate]);

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
        {filteredList.map((item) => (
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
