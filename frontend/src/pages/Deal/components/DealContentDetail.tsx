import { useRecoilValue } from 'recoil';
import useDealContentDetail from '../../../business/hooks/useDeal/useDealContentDetail';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';
import { getDealContentDetailQuery } from '../../../stores/queries/getDealContentDetailQuery';
import { formatNumberWithCommas } from '../../../util/moneyComma';
type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => <div className={`bg-gray-200 animate-pulse ${className}`}></div>;

const DealContentDetail = () => {
  const { data: deal } = useDealContentDetail();

  if (!deal) {
    return (
      <div className="border-2 h-full w-full">
        <Skeleton className="h-[var(--contentImg-Height)] w-full" />
        <Skeleton className="h-6 w-[60%] mb-2" />
        <Skeleton className="h-10 mb-2" />
        <Skeleton className="h-6 w-[30%]" />
      </div>
    ); // 데이터가 로딩 중일 때 스켈레톤 UI 표시
  }

  return (
    <div className="border-2 h-full w-full">
      <div>
        <img
          className="h-[var(--contentImg-Height)] w-full object-cover"
          referrerPolicy="no-referrer"
          src={`${deal.image}`}
          alt="Deal Image"
        />
        <div className="text-[20px] mb-[8px] font-black whitespace-nowrap overflow-hidden text-ellipsis">
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
