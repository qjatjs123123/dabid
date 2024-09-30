import React, { useEffect, useState } from 'react';
import AuctionDetailsImage from './components/AuctionDetails/AuctionDetailsImage';
import AuctionDetailsBidding from './components/AuctionDetails/AuctionDetailsBidding';
import AuctionDetailsDescription from './components/AuctionDetails/AuctionDetailsDescription';

interface AuctionData {
  deposit: number;
  person: number;
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

const AuctionDeatil: React.FC<{ token: string }> = ({ token }) => {
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const response = await fetch('https://j11a505.p.ssafy.io/api/auctions/2', {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZyb250X21hc3RlckBzc2FmeS5jb20iLCJpYXQiOjE3Mjc2NTg1MjQsImV4cCI6MTcyNzY2OTMyNH0.BXElJYaQwPIQHfnJH2bu3xRp0n_wpsQk0f5lPsmunYY`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: AuctionData = await response.json();
        setAuctionData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchAuctionData();
  }, [token]);

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
          <AuctionDetailsBidding />
          <AuctionDetailsDescription />
        </div>
      </div>
    </div>
  );
};

export default AuctionDeatil;
