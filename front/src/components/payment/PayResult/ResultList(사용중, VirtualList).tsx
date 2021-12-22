//VirtualList

import styled from "styled-components";
import ResultItem from "./ResultItem";
import fetchData from "../../../api/fetchData";
import useScroll from "../../../hooks/useScroll";
import { FunctionComponent, useEffect, useState, useCallback } from "react";
import { FilterValueProps, PayDataListProps } from "./model";

const ResultList: FunctionComponent<FilterValueProps> = ({
  startDate,
  endDate,
  payStatusKeyword,
  plateNumKeyword,
}) => {
  //리스트
  const [list, setList] = useState<PayDataListProps[]>([]); //filteredList가 주로 사용된다 하더라도 원본 데이터는 유지되어야 함
  const [filteredList, setFilteredList] = useState<PayDataListProps[]>([]);
  const [slicedFilteredList, setSlicedFilteredList] = useState<
    PayDataListProps[]
  >([]);

  //수치값
  const itemHeight = 45;
  const nodePadding = 20; //TODO: 이걸 충분히 늘려줬음에도 스크롤시 자글자글 거리는 이유는?ㅠㅠ
  const scrollViewPortHeight = 490;
  const [totalContainerHeight, setTotalContainerHeight] = useState<number>(0);
  const { scrollTop, scrollContainerRef } = useScroll(
    itemHeight,
    list,
    filteredList
  );

  //visible 노드 자르기 위한 수치
  const startIndex = Math.max(
    Math.floor(scrollTop / itemHeight) - nodePadding,
    0
  );
  const visibleNodeCount = Math.floor(
    scrollViewPortHeight / itemHeight + 2 * nodePadding
  );
  const endIndex = startIndex + visibleNodeCount;
  const offsetY = startIndex * itemHeight;

  //전체 데이터 가져오기
  const getMoreData = useCallback(async () => {
    try {
      const payData = await fetchData();
      setList(payData); //여기에 setFilteredList(payData)를 해버리면 페이지가 올라갈때마다 필터가 풀림
      setTotalContainerHeight(payData.length * itemHeight);
    } catch (e) {
      console.error(e);
    }
  }, []);

  //전체 데이터에 필터 걸기
  const filterData = () => {
    //아무 필터도 없는 맨 처음은 list가 나와야 함
    if (
      payStatusKeyword &&
      plateNumKeyword &&
      startDate &&
      endDate === undefined
    ) {
      setFilteredList(list);
    } else {
      const filteredList = list.reduce<PayDataListProps[]>((acc, cur) => {
        const payStatusKeywordCondition = payStatusKeyword
          ? cur.payStatus === payStatusKeyword
          : true;
        const payNumKeywordCondition =
          plateNumKeyword && plateNumKeyword.length > 0
            ? cur.plateNum.includes(plateNumKeyword)
            : true;
        const startDateCondition = startDate
          ? startDate.getTime() -
              new Date(cur.payDate.replace(/-/g, "/")).getTime() <=
            0
          : true;
        const endDateCondition = endDate
          ? endDate.getTime() -
              new Date(cur.payDate.replace(/-/g, "/")).getTime() >=
            0
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
    }
  };

  useEffect(() => {
    getMoreData();
  }, []);

  useEffect(() => {
    filterData();
  }, [list, payStatusKeyword, plateNumKeyword, startDate, endDate]);

  //visible nodes 자르기
  //TODO: 중간에 왜 두번 되는지 모르겠네...
  useEffect(() => {
    setSlicedFilteredList(filteredList.slice(startIndex, endIndex));
  }, [filteredList, startIndex]);

  return (
    <ResultListBox ref={scrollContainerRef} height={scrollViewPortHeight}>
      <TotalItemBox height={totalContainerHeight}>
        <VisibleContentsBox offsetY={offsetY}>
          {slicedFilteredList.length === 0 ? (
            <NoResult>
              <div>결과가 없어요</div>
              <div>검색조건을 확인해주세요</div>
            </NoResult>
          ) : (
            slicedFilteredList.map((item) => (
              <ResultItem key={item.payID} itemHeight={itemHeight} {...item} />
            ))
          )}
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
  transform: translateY(
    ${(props) => props.offsetY}px
  ); //px 단위를 안넣어주면 인식이 잘 안됨
`;

const NoResult = styled.div`
  text-align: center;
  padding: 8rem 0;
  font-size: 1.8rem;
  font-weight: bold;

  > div {
    padding: 0.8rem;
  }
`;
