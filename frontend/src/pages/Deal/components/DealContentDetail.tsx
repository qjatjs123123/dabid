import useDealContentDetail from '../../../business/hooks/useDeal/useDealContentDetail';
import { formatNumberWithCommas } from '../../../util/moneyComma';
import DealContentUserProfile from './DealContentUserProfile';
import DealContentDetailSkeleton from '../skeletons/DealContentDetailSkeleton';
import DealButton from '../../../components/Button/DealButton';
import DeliveryStatusSearch from './DeliveryStatusSearch';
import DealStatus from './DealStatus';

const DealContentDetail = () => {
  const { dealContentDetail: deal, showSkeleton } = useDealContentDetail();

  if (showSkeleton || !deal) {
    return <DealContentDetailSkeleton />; // 스켈레톤 UI를 보여줌
  }

  return (
    <div className="flex-3 max-h-[calc(100vh-150px)] overflow-y-auto w-full scroll-hide scroll-hide">
      <div className="w-full h-[80px]"></div>
      <div className="h-[calc(100%-80px)] px-[90px]">
        <div>
          <img
            className=" h-[400px] w-full object-cover rounded-lg mb-[25px]"
            referrerPolicy="no-referrer"
            src={`${deal.image}`}
            alt="Deal Image"
          />
          <div className="flex justify-start">
            <div className="flex-2 flex item-center">
              <DealContentUserProfile />
            </div>
            <div className="flex-1 flex justify-end">
              <div className="w-[180px]">
                <DealButton />
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#e9ecef] mt-[25px] mb-[25px]"></div>
          <div className="text-[30px] font-[600] mb-[4px] leading-tight ">{deal.title}</div>
          <div className="mb-[4px] text-[16px] text-[#868e96] font-[400]">12시간 06분 전</div>
          <div className="mb-[25px]">
            <span className="font-[800] text-[19px]">{formatNumberWithCommas(deal.winning_bid)} 원</span>
          </div>
          <div className="mb-[8px] text-[17px] leading-tight">{deal.detail}</div>
          <div className="h-[1px] w-full bg-[#e9ecef] mt-[25px] mb-[25px]"></div>

          <DeliveryStatusSearch />

          <div className="h-[1px] w-full bg-[#e9ecef] mt-[35px] mb-[25px]"></div>
          <DealStatus />
          <div className="mb-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default DealContentDetail;
