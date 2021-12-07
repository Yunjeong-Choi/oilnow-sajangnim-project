import styled from "styled-components";
import ResultItem from "./ResultItem";
import { FunctionComponent, useEffect, useState, useCallback } from "react";
import fetchData from "../../../api/fetchData";
// import list from "../../../store/payData.json";

const itemHeight = 45;
const itemViewPortCount = 10;
const itemReadyCount = itemViewPortCount + 10 * 2;
const scrollViewPortHeight = 400;

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

interface responseType {
  payData: [];
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
  // const [scrollTop, scrollContainerRef] = useScroll();
  // const [page, setPage] = useState(0);
  const [list, setList] = useState<payDataListProps[]>([]);
  const [filteredList, setFilteredList] = useState<payDataListProps[]>([]);

  const totalItemCount = Math.max(list.length, itemReadyCount);
  const containerHeight = Math.max(
    scrollViewPortHeight,
    itemHeight * totalItemCount
  );

  useEffect(() => {
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

  // const startIndex = Math.max(Math.floor(scrollTop / itemHeight), 0);
  // const offsetY = startIndex * itemHeight;
  // const visibleNodes = list.slice(
  //   startIndex,
  //   startIndex + scrollViewPortHeight / itemHeight
  // );

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
  //TODO: 왜 여기에 디펜던시 설정이 있는데, 아래 useEffect로 한번 더 할까
  //처음 렌더링 될때 한번 실행이 되어야 하니까?
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   const BUFFER_AREA = scrollViewPortHeight / 3;
  //   if (scrollTop + scrollViewPortHeight >= containerHeight - BUFFER_AREA) {
  //     setPage(page + 1);
  //   }
  // }, [scrollTop]);

  return (
    <ResultListBox
      pHeight={scrollViewPortHeight}
      // style={{
      //   height: 400,
      //   overflowY: "auto", //하위 요소가 부모요소를 넘어서면 스크롤이 생기도록
      //   //TODO: 타입에 쉼표가 자꾸 세미콜론으로 바뀜 -> 인터페이스로 지정한다. 린트때문인듯
      // }}
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
// interface ResultListBoxProps {
//   pHeight: number;
//   overflowY: string
// }
const ResultListBox = styled.div<{ pHeight: number }>`
  height: ${(props) => `${props.pHeight}px`};
  overflow-y: auto;
  /* TODO: 높이가 안 먹히고 있음 -> 단위 인식을 못하는 것으로 추측 */
`;

const TotalItemBox = styled.div``;
