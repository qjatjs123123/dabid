import React from 'react';
import useDealContent from '../../../business/hooks/useDeal/useDealContent';
import DealContentContainer from '../components/DealContentUserProfile';
import { formatNumberWithCommas } from '../../../util/moneyComma';
interface DealProps {
  deal: {
    id: number;
    seller_nickname: string;
    title: string;
    detail: string;
    image: string;
    winning_bid: number;
    status: string;
    isTimerVisible: boolean;
  };
}

const DealContent: React.FC<DealProps> = ({ deal }) => {
  const { handleClick, boxShadowClasses, borderColorClasses, transitionClasses } = useDealContent(deal.id);

  return (
    <div
      className={`p-2 mb-2 w-full rounded-md ${borderColorClasses} ${boxShadowClasses} ${transitionClasses} cursor-pointer`}
      onClick={handleClick}
    >
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

      <DealContentContainer />
      {/* 기타 필요한 데이터들 추가 */}
    </div>
  );
};

export default DealContent;
