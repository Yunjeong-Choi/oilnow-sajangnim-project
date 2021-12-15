//무한스크롤(페이지네이션)를 제외하고 가상리스트만 적용한 이유
//필터가 모든 데이터에 적용된 결과에 버추얼리스트를 적용하려면 서버에서 적용해주거나
//처음부터 모든 데이터를 가져와야 함
//지금은 처음부터 다 가져와서 프론트에서 가상리스트로 최적화 하기 (무한스크롤 페이지네이션 -> 가상리스트 -> 점진적 최적화)

import styled from "styled-components";
import ResultItem from "./ResultItem";
import fetchData from "../../../api/fetchData";
import useScroll from "../../../hooks/useScroll";
import { FunctionComponent, useEffect, useState, useCallback } from "react";

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

const ResultList: FunctionComponent<ResultListProps> = ({
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
  const nodePadding = 20;
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
      setList(payData); //여기에 setFilteredList를 동일하게 해버리면 페이지가 올라갈때마다 필터가 풀림
      setTotalContainerHeight(payData.length * itemHeight);
    } catch (e) {
      console.error(e);
    }
  }, []);

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
      //TODO: 필터에 해당하는 결과값이 없는 경우는 <결과없음>이 떠야함
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
    }
  };

  useEffect(() => {
    getMoreData();
  }, []);

  useEffect(() => {
    filterData();
  }, [list, payStatusKeyword, plateNumKeyword, startDate, endDate]);

  //TODO: 중간에 왜 두번 되는지 모르겠네...
  useEffect(() => {
    setSlicedFilteredList(filteredList.slice(startIndex, endIndex));
  }, [filteredList, startIndex]);

  return (
    <ResultListBox ref={scrollContainerRef} height={scrollViewPortHeight}>
      <TotalItemBox height={totalContainerHeight}>
        <VisibleContentsBox offsetY={offsetY}>
          {slicedFilteredList.map((item) => (
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
  transform: translateY(
    ${(props) => props.offsetY}px
  ); //px 단위를 안넣어주면 인식이 잘 안됨
`;
