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
      <div className="flex flex-row mt-4">
        <div className="flex-12">{auctionData.title}</div>
      </div>

      <div className="flex flex-row">
        <div className="flex-6">
          <AuctionDetailsImage images={auctionData.images} />
        </div>
        <div className="flex-6">
          <AuctionDetailsBidding auctionData={auctionData} />
          <AuctionDetailsDescription detail={auctionData.detail} />
        </div>
      </div>
    </div>
  );
};

export default AuctionDeatil;
