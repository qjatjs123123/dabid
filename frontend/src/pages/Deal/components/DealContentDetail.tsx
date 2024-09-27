import useDealContentDetail from '../../../business/hooks/useDeal/useDealContentDetail';
import { formatNumberWithCommas } from '../../../util/moneyComma';
import { useEffect } from 'react';
import DealContentUserProfile from './DealContentUserProfile';
import DealContentDetailSkeleton from '../skeletons/DealContentDetailSkeleton';
import { SKELETON_TIME } from '../../../util/Constants';

const DealContentDetail = () => {
  const { dealContentDetail: deal, showSkeleton, setShowSkeleton } = useDealContentDetail();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, SKELETON_TIME.TIME); // 1초 후에 스켈레톤 UI를 숨김

    return () => clearTimeout(timer);
  }, [deal]);

  if (showSkeleton || !deal) {
    return <DealContentDetailSkeleton />;
  }

  return (
    <div className="flex-3 h-full px-[200px]">
      <div>
        <img
          className=" h-[400px] w-full object-cover rounded-lg mb-4"
          referrerPolicy="no-referrer"
          src={`${deal.image}`}
          alt="Deal Image"
        />
        <DealContentUserProfile />
        <div className="text-[20px] mt-4 mb-[8px] font-blackoverflow-hidden text-ellipsis line-clamp-1">
          {deal.title}
        </div>
        <div className="mb-[4px] h-[48px] overflow-hidden text-ellipsis line-clamp-2">{deal.detail}</div>
        <div className="mb-[5px]">
          <span className="text-[20px]  font-black mr-[3px]">{formatNumberWithCommas(deal.winning_bid)}</span>
          <span>원</span>
        </div>
        {/* 기타 필요한 데이터들 추가 */}
      </div>
    </div>
  );
};

export default DealContentDetail;
