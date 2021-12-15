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
  const [page, setPage] = useState<number>(0);
  const { scrollTop, containerHeight, scrollContainerRef } = useScroll(
    itemHeight,
    list
  );

  const getMoreData = useCallback(async () => {
    try {
      const payData = await fetchData(page);
      setList(list.concat(payData));
      console.log(payData);
    } catch (e) {
      console.error(e);
    }
  }, [page]);

  useEffect(() => {
    getMoreData();
  }, [getMoreData]);

  useEffect(() => {
    if (scrollTop + scrollViewPortHeight >= containerHeight - 10) {
      const nextPage = page + 1;
      setPage(nextPage);
      console.log(nextPage, scrollTop, containerHeight);
    }
  }, [scrollTop, containerHeight]);

  return (
    <ResultListBox ref={scrollContainerRef} height={scrollViewPortHeight}>
      <TotalItemBox height={containerHeight}>
        <VisibleContentsBox>
          {list.map((item) => (
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
