import React, { useEffect } from 'react';
import AuctionContainer from './components/Auctions/AuctionContainer';
import { AuctionListDto, auctionListState } from '../../stores/recoilStores/auctionListState';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';

const Auction: React.FC = () => {
  const [_, setAuctionList] = useRecoilState(auctionListState);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('search');

    if (searchTerm) {
      fetchAuctionsBySearchTerm(searchTerm);
    } else {
      fetchAllAuctions();
    }
  }, [location.search]);

  const fetchAuctionsBySearchTerm = async (searchTerm: string) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const requestBody = JSON.stringify({ title: searchTerm });

      const response = await fetch('https://j11a505.p.ssafy.io/api/auctions/title', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error('검색 요청이 실패했습니다.');
      }

      const data: AuctionListDto[] = await response.json();
      setAuctionList(data); // 검색 결과로 상태 업데이트
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllAuctions = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('https://j11a505.p.ssafy.io/api/auctions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('전체 목록 요청이 실패했습니다.');
      }

      const data: AuctionListDto[] = await response.json();
      setAuctionList(data); // 전체 목록으로 상태 업데이트
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <AuctionContainer />
      </div>
    </div>
  );
};

export default Auction;
