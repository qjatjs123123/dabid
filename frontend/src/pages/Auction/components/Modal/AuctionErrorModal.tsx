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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">오류 발생</h2>
        <p>{displayedMessage}</p> {/* 수정된 메시지 사용 */}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionErrorModal;
