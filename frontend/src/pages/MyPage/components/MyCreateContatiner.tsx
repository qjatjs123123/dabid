import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumberWithCommas } from '../../../util/moneyComma';

export class AuctionListDto {
  auctionId: string;
  title: string;
  thumbnail: string;
  secondBid: string;
  person: number;
  finishedAt: Date;
  createdAt: Date;

  constructor(
    auctionId: string,
    title: string,
    thumbnail: string,
    secondBid: string,
    person: number,
    finishedAt: Date,
    createdAt: Date,
  ) {
    this.auctionId = auctionId;
    this.title = title;
    this.thumbnail = thumbnail;
    this.secondBid = secondBid;
    this.person = person;
    this.finishedAt = finishedAt;
    this.createdAt = createdAt;
  }
}

interface AuctionContainerProps {
  auctionList: AuctionListDto[]; // props로 auctionList를 받음
  setAuctionList: React.Dispatch<React.SetStateAction<AuctionListDto[]>>; // 상태 업데이트 함수
}

const AuctionContainer: React.FC<AuctionContainerProps> = ({ auctionList, setAuctionList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch('https://j11a505.p.ssafy.io/api/auctions/mine', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('네트워크 응답이 좋지 않습니다.');
        }

        const data: AuctionListDto[] = await response.json();
        setAuctionList(data); // API로부터 받은 데이터를 상태로 업데이트
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchAuctions();
  }, [setAuctionList]); // setAuctionList가 변경될 때마다 호출

  const handleAuctionClick = (auctionId: string) => {
    navigate(`/auctions/${auctionId}`);
  };

  return (
    <div className={`card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ml-auto cursor-pointer`}>
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
