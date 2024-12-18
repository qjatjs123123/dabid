import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

        const response = await fetch('https://j11a505.p.ssafy.io/api/auctions', {
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
    <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ml-auto">
      {auctionList.map((auction, index) => (
        <div
          key={index}
          className="card border border-gray-300 p-4 text-center rounded w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-4"
          onClick={() => handleAuctionClick(auction.auctionId)}
        >
          <input type="hidden" value={auction.auctionId} />
          <img
            src={auction.thumbnail}
            alt={auction.title}
            className="w-full h-48 object-cover mb-2" // 높이를 48로 고정
          />
          <h4 className="font-semibold">{auction.title}</h4>
          <p className="text-lg">경매가: {auction.secondBid}원</p>
          <p className="text-sm text-gray-600">참가자: {auction.person}명</p>
        </div>
      ))}
    </div>
  );
};

export default AuctionContainer;
