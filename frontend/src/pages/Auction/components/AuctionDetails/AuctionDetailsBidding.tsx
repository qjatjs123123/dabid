import React, { useEffect, useState } from 'react';
import BiddingInput from './AuctionDeatilsComponents/BiddingInput';
import BiddingStatus from './AuctionDeatilsComponents/BiddingStatus';

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const AuctionBiddingInfo: React.FC = () => {
  const endDate = new Date('2024-12-28T16:00:00+09:00'); // 서울 시간
  const [timeRemaining, setTimeRemaining] = useState<string>('--시간 --분 --초');

  const isOwner = false; // 소유자 여부
  const isParticipant = true; // 참여자 여부
  const isFirstMember = true; // 1등 입찰자(= 낙찰 유력자)인지 여부

  const number1 = 120000;

  const calculateTimeRemaining = () => {
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
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col items-center m-4 p-5 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center m-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">현재가</h1>
          <p className="text-2xl font-semibold text-gray-800">{formatNumber(number1)}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">남은 시간</p>
          <div className="text-xl font-semibold">
            <p>{timeRemaining}</p>
            <p className="text-sm text-gray-500">(2024년 11월 28일 16:00:00)</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">경매 참여자</p>
          <p className="text-xl font-semibold">25명</p>
        </div>

        <div>
          <BiddingInput
            isOwner={isOwner}
            isParticipant={isParticipant}
            isFirstMember={isFirstMember}
            number1={number1}
            formatNumber={formatNumber}
          />
        </div>

        <div>
          <BiddingStatus isOwner={isOwner} isParticipant={isParticipant} isFirstMember={isFirstMember} />
        </div>
      </div>

      <div className="mt-1 flex items-center">
        <p className="text-gray-600">판매자</p>
        <img
          src="https://via.placeholder.com/300x200?text=Image+1"
          alt="판매자 프로필"
          className="w-10 h-10 rounded-full ml-2"
        />
        <p className="ml-2 font-semibold">qjatjs123123</p>
      </div>
    </div>
  );
};

export default AuctionBiddingInfo;
