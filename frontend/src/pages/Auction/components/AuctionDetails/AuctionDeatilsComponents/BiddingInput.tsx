import React from 'react';

interface BiddingInputProps {
  isOwner: boolean;
  isParticipant: boolean;
  isFirstMember: boolean;
  number1: number;
  formatNumber: (num: number) => string;
}

const BiddingInput: React.FC<BiddingInputProps> = ({
  isOwner,
  isParticipant,
  isFirstMember,
  number1,
  formatNumber,
}) => {
  if (isOwner || !isParticipant) {
    return null; // 조건에 맞지 않으면 아무것도 렌더링하지 않음
  }

  return (
    <div className="mt-4 flex justify-between items-center">
      <label className="text-gray-600 mb-2">내 입찰가</label>
      {isFirstMember ? (
        <div className="flex items-center">
          <p>{formatNumber(number1)}</p>
          <span className="ml-2 text-gray-600">WON</span>
        </div>
      ) : (
        <div className="flex items-center">
          <input type="number" className="border rounded py-2 px-3 w-40 text-right" placeholder="0" />
          <span className="ml-2 text-gray-600">WON</span>
        </div>
      )}
    </div>
  );
};

export default BiddingInput;
