import React, { useEffect, useState } from 'react';
import BiddingInput from './AuctionDeatilsComponents/BiddingInput';
import BiddingStatus from './AuctionDeatilsComponents/BiddingStatus';

interface AuctionData {
  auctionId: number;
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
  onwer: boolean;
  participant: boolean;
}

interface AuctionDetailsBiddingProps {
  auctionData: AuctionData;
}

const formatCurrency = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatDateArrayToString = (dateArray: number[]): string => {
  const [year, month, day, hours, minutes] = dateArray;

  // 월은 0부터 시작하므로 +1 해줌
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${year}년 ${formattedMonth}월 ${formattedDay}일 ${formattedHours}시 ${formattedMinutes}분`;
};

const AuctionBiddingInfo: React.FC<AuctionDetailsBiddingProps> = ({ auctionData }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('--시간 --분 --초');

  const calculateTimeRemaining = (finishedAt: number[]) => {
    const [year, month, day, hour, minute, second, millisecond] = finishedAt;
    const endDate = new Date(year, month - 1, day, hour, minute, second, millisecond);
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      setTimeRemaining('--시간 --분 --초');
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (days > 0) {
      setTimeRemaining(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
    } else {
      setTimeRemaining(`${hours}시간 ${minutes}분 ${seconds}초`);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeRemaining(auctionData.finishedAt);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col items-center m-4 p-5 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center m-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">현재가</h1>
          <p className="text-2xl font-semibold text-gray-800">{formatCurrency(auctionData.bid)}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">남은 시간</p>
          <div className="text-xl font-semibold">
            <p>{timeRemaining}</p>
            <p className="text-sm text-gray-500">{formatDateArrayToString(auctionData.finishedAt)}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">경매 참여자</p>
          <p className="text-xl font-semibold">{auctionData.person}명</p>
        </div>

        <div>
          <BiddingInput
            isOwner={auctionData.onwer}
            isParticipant={auctionData.participant}
            isFirstMember={auctionData.firstMember}
            // finishedAt={auctionData.finishedAt}
            // formatNumber={formatNumber}
          />
        </div>

        <div>
          <BiddingStatus
            isOwner={auctionData.onwer}
            isParticipant={auctionData.participant}
            isFirstMember={auctionData.firstMember}
          />
        </div>
      </div>

      <div className="mt-1 flex items-center">
        <p className="text-gray-600">판매자</p>
        <img
          src={auctionData.profileImage ? auctionData.profileImage : 'https://via.placeholder.com/300x200?text=Image+1'}
          alt="판매자 프로필"
          className="w-10 h-10 rounded-full ml-2"
        />
        <p className="ml-2 font-semibold">{auctionData.nickname}</p>
      </div>
    </div>
  );
};

export default AuctionBiddingInfo;
