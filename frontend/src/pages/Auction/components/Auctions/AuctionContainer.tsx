import React, { useEffect, useState } from 'react';
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

const AuctionContainer = () => {
  const [auctionList, setAuctionList] = useState<AuctionListDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        // 로컬 스토리지에서 accessToken 가져오기
        const accessToken =
          'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImE1MDVhZHNhc2Q1c3NhZnkwMkBzc2FmeS5jb20iLCJpYXQiOjE3Mjc2NzUyMjYsImV4cCI6MTcyNzY4NjAyNn0.O6MiW2E9XhUGgoDhiHS0tO0oLMt1GXDmudiUy9Ja1BE'; //localStorage.getItem('accessToken');

        const response = await fetch('https://j11a505.p.ssafy.io/api/auctions', {
          method: 'GET', // 기본값은 GET이지만 명시적으로 추가
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // accessToken을 Authorization 헤더에 추가
          },
        });

        if (!response.ok) {
          throw new Error('네트워크 응답이 좋지 않습니다.');
        }

        const data: AuctionListDto[] = await response.json();
        setAuctionList(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // 에러 메시지를 설정
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const handleAuctionClick = (auctionId: string) => {
    navigate(`/auctions/${auctionId}`);
  };

  return (
    <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 w-5/6 ml-auto">
      {auctionList.map((auction, index) => (
        <div
          key={index}
          className="card border border-gray-300 p-4 text-center rounded w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-4"
          onClick={() => handleAuctionClick(auction.auctionId)}
        >
          <input type="hidden" value={auction.auctionId} />
          <img src={auction.thumbnail} alt={auction.title} className="w-full h-auto mb-2" />
          <h4 className="font-semibold">{auction.title}</h4>
          <p className="text-lg">경매가: {auction.secondBid}원</p>
          <p className="text-sm text-gray-600">참가자: {auction.person}명</p>
        </div>
      ))}
    </div>
  );
};

export default AuctionContainer;
