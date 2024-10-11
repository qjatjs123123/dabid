import React from 'react';
import { useEffect, useState } from 'react';
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

  const [showFirstText, setShowFirstText] = useState(false);
  useEffect(() => {
    const firstTextTimer = setTimeout(() => {
      setShowFirstText(true);
    }, 100); // 텍스트 애니메이션 시작

    return () => {
      clearTimeout(firstTextTimer);
    };
  }, []);

  return (
    <div
      className={`card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ml-auto cursor-pointer ${showFirstText ? 'animate-fade-in' : 'opacity-0'}`}
    >
      {auctionList.map((auction, index) => (
        <div
          key={index}
          className="card border border-gray-300 p-4 rounded w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-4 shadow-lg"
          onClick={() => handleAuctionClick(auction.auctionId)}
        >
          <img src={auction.thumbnail} alt={auction.title} className="w-full h-48 object-cover mb-2" />

          <input type="hidden" value={auction.auctionId} />

          <h4 className="font-bold text-[18px] overflow-hidden text-ellipsis line-clamp-1">{auction.title}</h4>
          {/* <h4 className="font-bold text-[18px]">
            {auction.title.length > 15 ? `${auction.title.slice(0, 15)}...` : auction.title}
          </h4> */}

          <div className="flex justify-between w-full mt-[10px] items-end">
            <p className="text-sm text-gray-600">참가자: {auction.person}명</p>
            <p className="text-[20px] text-db_main font-bold">{formatNumberWithCommas(Number(auction.secondBid))} 원</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuctionContainer;
