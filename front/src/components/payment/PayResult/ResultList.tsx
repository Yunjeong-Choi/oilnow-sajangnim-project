import styled from "styled-components";
import ResultItem from "./ResultItem";
import { FunctionComponent, useEffect, useState } from "react";
import list from "../../../store/payData.json";

const itemHeight = 45;
const itemViewPortCount = 10;
const itemReadyCount = itemViewPortCount + 10 * 2;
const scrollViewPortHeight = 400;

interface payDataListProps {
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
    // //TODO: 필터가 두개 일때 (payStatusKeyword)는 이 조건을 어떻게 처리해야 할까요?
    // if (plateNumKeyword.length === 0) {
    //   setFilteredList([]);
    //   return;
    // }

    const filteredList = list.filter(
      // if (typeof plateNumKeyword === "undefined") return;
      // 얼리리턴을 해도 되지만 아래처럼 하는게 더 간결함
      (item) =>
        item.plateNum.includes(plateNumKeyword || "") ||
        item.payStatus === payStatusKeyword //TODO: 왜 안될까...
    );
    setFilteredList(filteredList);
  }, [plateNumKeyword, payStatusKeyword]);
  //띄어쓰기를 무시한 검색이 가능하도록 하려면 공수가 많이 듬. 주소검색은 분류가 명확하니까 괜찮지만
  //한글자씩 검색해서 결과를 추려나갈수도 있음
  //공수를 들이는 만큼 효용이 있는가, 선택의 문제

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
      height={scrollViewPortHeight}
      style={{
        overflowY: "auto", //하위 요소가 부모요소를 넘어서면 스크롤이 생기도록
        //TODO: 타입에 쉼표가 자꾸 세미콜론으로 바뀜
      }}
    >
      <TotalItemBox style={{ height: containerHeight, position: "relative" }}>
        {(filteredList.length > 0 ? filteredList : list).map((item) => (
          <ResultItem key={item.payID} {...item} />
        ))}
      </TotalItemBox>
    </ResultListBox>
  );
};

export default ResultList;

//styled-components
const ResultListBox = styled.div<{ height: number }>`
  height: ${(props) => props.height};
  /* TODO: 높이가 안 먹히고 있음 */
`;

const TotalItemBox = styled.div``;
