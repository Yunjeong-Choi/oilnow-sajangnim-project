import styled from "styled-components";
import ResultItem from "./ResultItem";
import { FunctionComponent, useEffect, useState } from "react";
import list from "../../../store/payData.json";

const itemHeight = 45;
const itemViewPortCount = 10;
const itemReadyCount = itemViewPortCount + 10 * 2;
const scrollViewPortHeight = 500;

interface payDataListProps {
  payID: number;
  payStatus: string;
  payDate: string;
  plateNum: string;
  payPrice: number;
}

interface ResultListProps {
  payStatusKeyword: string | undefined;
  plateNumKeyword: string | undefined;
}

const ResultList: FunctionComponent<ResultListProps> = ({
  payStatusKeyword,
  plateNumKeyword,
}) => {
  // const list = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30,
  // ];
  // const [list, setList] = useState([]);
  // const [scrollTop, scrollContainerRef] = useScroll();
  // const [page, setPage] = useState(0);
  const [filteredList, setFilteredList] = useState<payDataListProps[]>([]);

  const totalItemCount = Math.max(list.length, itemReadyCount);
  const containerHeight = Math.max(
    scrollViewPortHeight,
    itemHeight * totalItemCount
  );

  useEffect(() => {
    if (typeof plateNumKeyword === "undefined") return;
    // //TODO: 여기서 return을 찍어버리면 화면 전체가 하얗게 아무것도 리턴이 안되는건가?
    // //TODO: 필터가 두개 일때 (payStatusKeyword)는 이 조건을 어떻게 처리해야 할까요?
    // if (plateNumKeyword.length === 0) {
    //   setFilteredList([]);
    //   return;
    // }

    const filteredList = list.filter(
      (item) => item.plateNum.includes(plateNumKeyword) //TODO: 띄어쓰기를 무시한 검색을 하려면?
    );
    setFilteredList(filteredList);
  }, [plateNumKeyword]);

  // const startIndex = Math.max(Math.floor(scrollTop / itemHeight), 0);
  // const offsetY = startIndex * itemHeight;
  // const visibleNodes = list.slice(
  //   startIndex,
  //   startIndex + scrollViewPortHeight / itemHeight
  // );

  // const getItem = useCallback(async () => {
  //   const apiData = {
  //     result: undefined,
  //     success: undefined,
  //   };

  //   try {
  //     const data = await fetchItem(page);
  //     apiData.result = data;
  //     apiData.success = true;
  //   } catch (e) {
  //     console.error(e);
  //     apiData.success = false;
  //   }

  //   if (!apiData.success) {
  //     alert("API call error!");
  //     return;
  //   }

  //   console.log("getItem!", page);
  //   setList(list.concat(apiData.result));
  // }, [page]);

  // useEffect(() => {
  //   getItem();
  // }, [page]);

  // useEffect(() => {
  //   const BUFFER_AREA = scrollViewPortHeight / 3;
  //   if (scrollTop + scrollViewPortHeight >= containerHeight - BUFFER_AREA) {
  //     setPage(page + 1);
  //   }
  // }, [scrollTop]);

  return (
    <ResultListBox
      style={{
        height: scrollViewPortHeight,
        overflowY: "auto", //하위 요소가 부모요소를 넘어서면 스크롤이 생기도록
        //TODO: 이걸 어떻게 styled 컴포넌트로 바꿀것인가
      }}
    >
      <TotalItemBox
        style={{ height: containerHeight, position: "relative" }}
        //TODO: 이걸 어떻게 styled 컴포넌트로 바꿀것인가
      >
        {(filteredList.length > 0 ? filteredList : list).map((item) => (
          <ResultItem key={item.payID} itemValue={item} />
        ))}
      </TotalItemBox>
    </ResultListBox>
  );
};

export default ResultList;

//styled-components
const ResultListBox = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

const TotalItemBox = styled.div``;
