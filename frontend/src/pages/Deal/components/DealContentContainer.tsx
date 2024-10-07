import React, { useRef, useEffect } from 'react';
import useDealContentList from '../../../business/hooks/useDeal/useDealContentList';
import DealContent from './DealContent';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';
import { dealIsContent } from '../../../stores/recoilStores/Deal/stateIsContent';
import { MESSAGE } from '../../../util/Constants';

const DealContentContainer = () => {
  const { data: dealContentList, fetchNextPage, hasNextPage } = useDealContentList();
  const curDealId = useRecoilValue(curDealIdState);

  const setCurDealId = useSetRecoilState(curDealIdState);
  const setIsContent = useSetRecoilState(dealIsContent);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const IsExistContent = () => {
    if (curDealId === -1 && dealContentList && !dealContentList.pages[0].hasOwnProperty('content')) return false;
    return true;
  };

  useEffect(() => {
    if (curDealId === -1 && dealContentList) {
      // console.log(curDealId, dealContentList, dealContentList.pages.length);
      if (!IsExistContent()) return;

      const firstId = dealContentList.pages[0]?.content[0]?.id ?? -1;
      setIsContent(true);
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
      {curDealId !== -1 && dealContentList ? (
        dealContentList.pages.map((page, pageIndex) =>
          page.content.map((deal) => <DealContent key={deal.id} deal={deal} />),
        )
      ) : (
        <div className="text-center text-[50px]">
          <p>{MESSAGE.DEAL_LIST_NO_CONTENTS}</p>{' '}
        </div>
      )}

      {/* 무한 스크롤을 위한 감시 지점 */}
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
};

export default DealContentContainer;
