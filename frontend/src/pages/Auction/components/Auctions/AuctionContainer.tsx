import React from 'react';
import { useRecoilState } from 'recoil';
import { AuctionListDto, auctionListState } from '../../../../stores/recoilStores/auctionListState';
import { useNavigate } from 'react-router-dom';
import { formatNumberWithCommas } from '../../../../util/moneyComma';

const AuctionContainer: React.FC = () => {
  const navigate = useNavigate();
  const [auctionList] = useRecoilState(auctionListState);

  const handleAuctionClick = (auctionId: string) => {
    navigate(`/auctions/${auctionId}`);
  };

  return (
    <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ml-auto cursor-pointer">
      {auctionList.map((auction, index) => (
        <div
          key={index}
          className="card border border-gray-300 p-4 rounded w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-4"
          onClick={() => handleAuctionClick(auction.auctionId)}
        >
          <img src={auction.thumbnail} alt={auction.title} className="w-full h-48 object-cover mb-2" />

          <input type="hidden" value={auction.auctionId} />

          <h4 className="font-bold text-[18px]">{auction.title}</h4>

          <div className="flex justify-between w-full mt-[10px] items-end">
            <p className="text-sm text-gray-600">참가자: {auction.person}명</p>
            <p style={{ color: '#FF2334' }} className="text-[20px] font-bold">
              {formatNumberWithCommas(Number(auction.secondBid))} 원
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuctionContainer;
