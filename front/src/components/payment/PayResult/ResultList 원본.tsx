import styled from "styled-components";
import ResultItem from "./ResultItem";
import { FunctionComponent, useEffect, useState, useCallback } from "react";
import fetchData from "../../../api/fetchData";
import useScroll from "../../../hooks/useScroll";

export interface PayDataListProps {
  payID: number;
  payStatus: string;
  payDate: string;
  plateNum: string;
  payPrice: number;
  orderDetail: string;
  cancelReason: string;
  cancelImgURL: [];
  cancelClaim: string;
}

interface ResultListProps {
  startDate?: Date;
  endDate?: Date;
  payStatusKeyword: string | undefined;
  plateNumKeyword: string | undefined;
}

const itemViewPortCount = 10;
const itemPaddingCount = 10;
const itemInitialTotal = itemViewPortCount + itemPaddingCount;
const itemHeight = 45;
const scrollViewPortHeight = 490; // TODO: 반응형으로 높이조절 어떻게 할까

const ResultList: FunctionComponent<ResultListProps> = ({
  startDate,
  endDate,
  payStatusKeyword,
  plateNumKeyword,
}) => {
  const [page, setPage] = useState<number>(0);
  const [list, setList] = useState<PayDataListProps[]>([]); //filteredList가 주로 사용된다 하더라도 원본 데이터는 유지되어야 함
  const { scrollTop, scrollContainerRef } = useScroll(itemHeight, list);
  const [filteredList, setFilteredList] = useState<PayDataListProps[]>([]);

  const totalItemCount = Math.max(list.length, itemInitialTotal);
  const containerHeight = Math.max(
    scrollViewPortHeight,
    itemHeight * totalItemCount
  );
  const startIndex = Math.max(
    Math.floor(scrollTop / itemHeight) - itemPaddingCount,
    0
  );
  const offsetY = startIndex * itemHeight;
  const visibleNodes = list.slice(
    startIndex,
    startIndex +
      Math.floor(scrollViewPortHeight / itemHeight) +
      2 * itemPaddingCount
  );

  const filterData = () => {
    const filteredList = list.reduce<PayDataListProps[]>((acc, cur) => {
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

  const getData = useCallback(async () => {
    try {
      const payData = await fetchData(page);
      setList(list.concat(payData));
      setFilteredList(list.concat(payData));
    } catch (e) {
      console.error(e);
    }
  }, [page]);

  //getData를 실행시키는 부분
  //TODO: 왜 getData가 4번씩 실행이 될까
  useEffect(() => {
    getData();
    // 만약 무한스크롤이 fire 되는 순간 payStatusKeyword와 같은 필터 조건을 다시 콜해줘야 함.
    // filterPlateNumKeyword();
    // filterData();
  }, [page]);

  useEffect(() => {
    const BUFFER_AREA = scrollViewPortHeight / 3;
    if (scrollTop + scrollViewPortHeight >= containerHeight - BUFFER_AREA) {
      setPage(page + 1);
    }
  }, [scrollTop]);

  useEffect(() => {
    filterData();
  }, [payStatusKeyword, plateNumKeyword, startDate, endDate]);

  return (
    <ResultListBox ref={scrollContainerRef} height={scrollViewPortHeight}>
      <TotalItemBox height={containerHeight}>
        <VisibleContentsBox offsetY={offsetY}>
          {/* {payStatusKeyword || plateNumKeyword || startDate || endDate
            ? filteredList.map((item) => (
                <ResultItem key={item.payID} {...item} />
              ))
            : visibleNodes.map((item) => (
                <ResultItem key={item.payID} {...item} />
              ))} */}
          {visibleNodes.map((item) => (
            // {filteredList.map((item) => (
            <ResultItem key={item.payID} itemHeight={itemHeight} {...item} />
          ))}
        </VisibleContentsBox>
      </TotalItemBox>
    </ResultListBox>
  );
};

export default ResultList;

//styled-components
const ResultListBox = styled.div<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  overflow-y: auto;
  padding-right: 1.2rem;
`;

const TotalItemBox = styled.div<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  position: relative;
`;

const VisibleContentsBox = styled.div<{ offsetY: number }>`
  position: absolute;
  width: 100%;
  transform: translateY(${(props) => props.offsetY}px);
`;
