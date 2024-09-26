import React, { useRef, useEffect } from 'react';
import useDealContentList from '../../../business/hooks/useDeal/useDealContentList';
import DealContent from './DealContent';

const DealContentContainer = () => {
  const { data: dealContentList, fetchNextPage, hasNextPage } = useDealContentList();
  const observerRef = useRef<HTMLDivElement | null>(null);

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
    <div className="w-[500px]">
      {dealContentList?.pages.map((page, pageIndex) =>
        page.content.map((deal) => <DealContent key={deal.id} deal={deal} />),
      )}

      {/* 무한 스크롤을 위한 감시 지점 */}
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
};

export default DealContentContainer;
