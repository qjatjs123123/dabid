// AuctionErrorModal.tsx
import React from 'react';

interface AuctionErrorModalProps {
  isOpen: boolean; // 모달이 열려있는지 여부
  message: string; // 표시할 에러 메시지
  onClose: () => void; // 모달 닫기 함수
}

const AuctionErrorModal: React.FC<AuctionErrorModalProps> = ({ isOpen, message, onClose }) => {
  // message가 "API 요청 중 오류 발생"인 경우 수정
  const displayedMessage = message === 'API 요청 중 오류가 발생했습니다.' ? '사진의 크기가 너무 큽니다.' : message;

  if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">알림</h2>
        <p>{displayedMessage}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 bg-gray-300 text-black px-4 py-2 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionErrorModal;
