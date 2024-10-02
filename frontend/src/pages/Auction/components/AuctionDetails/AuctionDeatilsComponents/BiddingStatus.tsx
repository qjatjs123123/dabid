import React from 'react';

interface BiddingStatusProps {
  isOwner: boolean;
  isParticipant: boolean;
  isFirstMember: boolean;
}

const BiddingStatus: React.FC<BiddingStatusProps> = ({ isOwner, isParticipant, isFirstMember }) => {
  return (
    <div className="mt-6 flex justify-center">
      {isOwner ? (
        <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">경매 취소</button>
      ) : isParticipant && !isFirstMember ? (
        <div className="flex justify-around w-full">
          <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition">입찰하기</button>
          <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition ml-2">입찰포기</button>
        </div>
      ) : isParticipant && isFirstMember ? (
        <label className="text-red-600 mb-2">귀하는 현재 유력 낙찰자입니다!</label>
      ) : (
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">경매 참여</button>
      )}
    </div>
  );
};

export default BiddingStatus;
