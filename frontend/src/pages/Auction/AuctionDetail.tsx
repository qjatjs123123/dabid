import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AuctionDetailsImage from './components/AuctionDetails/AuctionDetailsImage';
import AuctionDetailsBidding from './components/AuctionDetails/AuctionDetailsBidding';
import AuctionDetailsDescription from './components/AuctionDetails/AuctionDetailsDescription';
import { PAGE_URL } from '../../util/Constants';

interface AuctionData {
  auctionId: number;
  deposit: number;
  person: number;
  firstBid: number;
  bid: number;
  title: string;
  category: string;
  detail: string;
  profileImage: string | null;
  nickname: string | null;
  finishedAt: number[];
  images: string[];
  firstMember: boolean;
  owner: boolean;
  participant: boolean;
}

const AuctionDeatil: React.FC = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctionData = async (auctionId: number) => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`https://j11a505.p.ssafy.io/api/auctions/${auctionId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: AuctionData = await response.json();
        setAuctionData(data);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        navigate(PAGE_URL.AUCTION_LIST);
      }
    };

    if (auctionId) {
      fetchAuctionData(parseInt(auctionId)); // auctionId를 숫자로 변환하여 전달합니다.
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!auctionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {/* 제목 */}
      <div className="flex flex-col md:flex-row mt-4">
        {/* <div className="flex-12 text-2xl font-bold">{auctionData.title}</div> */}
      </div>

      {/* 이미지 및 입찰 정보 */}
      <div className="flex flex-col lg:flex-row justify-center items-center">
        {/* 이미지 섹션 */}
        <div className="lg:flex-6 w-full lg:w-auto mb-4 lg:mb-0">
          <AuctionDetailsImage images={auctionData.images} />
        </div>

        {/* 입찰 정보 섹션 */}
        <div className="lg:flex-6 w-full lg:w-auto">
          <AuctionDetailsBidding auctionData={auctionData} />
          {/* <AuctionDetailsDescription detail={auctionData.detail} /> */}
        </div>
      </div>

      {/* 설명 */}
      <div className="flex flex-col w-full mt-4">
        <AuctionDetailsDescription detail={auctionData.detail} />
      </div>
    </div>
  );
};

export default AuctionDeatil;
