//Pagination(InfiniteScroll)
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
  const itemHeight = 45;
  const scrollViewPortHeight = 490;
  const [list, setList] = useState<PayDataListProps[]>([]); //filteredList가 주로 사용된다 하더라도 원본 데이터는 유지되어야 함
  const [filteredList, setFilteredList] = useState<PayDataListProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const { scrollTop, containerHeight, scrollContainerRef } = useScroll(
    itemHeight,
    list,
    filteredList
  );

  const getMoreData = useCallback(async () => {
    try {
      const payData = await fetchData(); //에러제거를 위해 임시수정 (실행을 위해서는 아래 코드 사용해야함)
      // const payData = await fetchData(page); //pagination을 위해 필요함
      setList(list.concat(payData)); //여기에 setFilteredList를 동일하게 해버리면 페이지가 올라갈때마다 필터가 풀림
      console.log(payData);
    } catch (e) {
      console.error(e);
    }
  }, [page]);

  const filterData = () => {
    // console.log(payStatusKeyword, plateNumKeyword, startDate, endDate);

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
  }, [getMoreData]);

  useEffect(() => {
    if (scrollTop + scrollViewPortHeight >= containerHeight - 100) {
      const nextPage = page + 1;
      setPage(nextPage);
      console.log(nextPage, scrollTop, containerHeight);
    }
  }, [scrollTop, containerHeight]);

  useEffect(() => {
    filterData();
  }, [list, payStatusKeyword, plateNumKeyword, startDate, endDate]);

  return (
    <ResultListBox ref={scrollContainerRef} height={scrollViewPortHeight}>
      <TotalItemBox height={containerHeight}>
        <VisibleContentsBox>
          {filteredList.map((item) => (
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

const VisibleContentsBox = styled.div`
  position: absolute;
  width: 100%;
`;
