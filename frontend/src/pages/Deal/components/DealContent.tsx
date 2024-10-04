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
    account: string;
  };
}

const DealContent: React.FC<DealProps> = ({ deal }) => {
  const { handleClick, boxShadowClasses, borderColorClasses, transitionClasses } = useDealContent(deal.id);

  return (
    <div
      className={`p-2 mb-4 w-full rounded-md ${borderColorClasses} ${boxShadowClasses} ${transitionClasses} cursor-pointer`}
      onClick={handleClick}
    >
      <img
        className="h-[var(--contentImg-Height)] w-full object-cover"
        referrerPolicy="no-referrer"
        src={`${deal.image}`}
        alt="Deal Image"
      />
      <div className="text-[20px] mb-[8px] font-[600] overflow-hidden text-ellipsis line-clamp-1">{deal.title}</div>
      <div className="mb-[4px] h-[48px] overflow-hidden text-ellipsis line-clamp-2">{deal.detail}</div>
      <div className="mb-[5px]">
        <span className="text-[20px]  font-[800] mr-[3px]">{formatNumberWithCommas(deal.winning_bid)}</span>
        <span>원</span>
      </div>

      <DealContentContainer />
    </div>
  );
};

export default DealContent;
