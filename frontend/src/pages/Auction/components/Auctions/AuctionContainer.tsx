import React from 'react';
import { useRecoilState } from 'recoil';
import { AuctionListDto, auctionListState } from '../../../../stores/recoilStores/auctionListState';
import { useNavigate } from 'react-router-dom';

const AuctionContainer: React.FC = () => {
  const navigate = useNavigate();
  const [auctionList] = useRecoilState(auctionListState);

  const handleAuctionClick = (auctionId: string) => {
    navigate(`/auctions/${auctionId}`);
  };

  return (
    <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ml-auto">
      {auctionList.map((auction, index) => (
        <div
          key={index}
          className="card border border-gray-300 p-4 text-center rounded w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-4"
          onClick={() => handleAuctionClick(auction.auctionId)}
        >
          <img src={auction.thumbnail} alt={auction.title} className="w-full h-48 object-cover mb-2" />
          <h4 className="font-semibold">{auction.title}</h4>
          <p className="text-lg">경매가: {auction.secondBid}원</p>
          <p className="text-sm text-gray-600">참가자: {auction.person}명</p>
        </div>
      ))}
    </div>
  );
};

export default AuctionContainer;
