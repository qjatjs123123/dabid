import React from 'react';
import useDealContent from '../../../business/hooks/useDeal/useDealContent';
import DealContentContainer from '../components/DealContentUserProfile';
import { formatNumberWithCommas } from '../../../util/moneyComma';
import DealContentTimer from './DealContentTimer';
interface DealProps {
  deal: {
    id: number;
    seller_nickname: string;
    title: string;
    detail: string;
    image: string;
    winning_bid: number;
    status: string;
    timerVisible: boolean;
    created_at: [number, number, number, number, number, number, number];
    seller_imageUrl: string;
    buyer_nickname: string;
    buyer_imageUrl: string;
  };
}

const DealContent: React.FC<DealProps> = ({ deal }) => {
  const { handleClick, boxShadowClasses, borderColorClasses, transitionClasses } = useDealContent(deal.id);

  return (
    <div
      className={`p-2 mb-4 w-full h-full rounded-md ${borderColorClasses} ${boxShadowClasses} ${transitionClasses} cursor-pointer`}
      onClick={handleClick}
    >
      <img
        className="h-[var(--contentImg-Height)] w-full object-cover"
        referrerPolicy="no-referrer"
        src={`${deal.image}`}
        alt="Deal Image"
      />
      <div
        className="text-[20px] w-full mb-[8px] font-[600] overflow-hidden text-ellipsis line-clamp-1"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          height: '1.5rem',
        }}
      >
        {deal.title}
      </div>
      <div
        className="mb-[4px]  w-full overflow-hidden"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          height: '3rem',
        }}
      >
        {deal.detail}
      </div>
      <div className="mb-[5px]">
        <span className="text-[20px] font-[800] mr-[3px]">{formatNumberWithCommas(deal.winning_bid)}</span>
        <span>원</span>
      </div>
      <div className="flex justify-between items-center h-full">
        <DealContentContainer imageUrl={deal.seller_imageUrl} nickname={deal.seller_nickname} value={''} />
        <DealContentTimer dealQuery={deal} fontSize="11px" />
      </div>
    </div>
  );
};

export default DealContent;
