import React, { useRef, useEffect } from 'react';
import useDealContentList from '../../../business/hooks/useDeal/useDealContentList';
import DealContent from './DealContent';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';

const DealContentContainer = () => {
  const { data: dealContentList, fetchNextPage, hasNextPage } = useDealContentList();
  const curDealId = useRecoilValue(curDealIdState);
  const setCurDealId = useSetRecoilState(curDealIdState);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (curDealId === -1) {
      const firstId = dealContentList ? dealContentList.pages[0].content[0].id : -1;
      setCurDealId(firstId);
    }
  }, [dealContentList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="max-h-[calc(100vh-150px)] overflow-y-auto flex flex-col border-r pt-[--dealContentContainer-pt] pr-[var(--dealContentContainer-pr)] scroll-hide">
      {dealContentList?.pages.map((page, pageIndex) =>
        page.content.map((deal) => <DealContent key={deal.id} deal={deal} />),
      )}

      {/* 무한 스크롤을 위한 감시 지점 */}
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
};

export default DealContentContainer;
