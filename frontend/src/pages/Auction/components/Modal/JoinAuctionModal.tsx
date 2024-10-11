import React from 'react';

interface ModalProps {
  auctionId: number;
  deposit: String;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const JoinAuctionModal: React.FC<ModalProps> = ({ deposit, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">알림</h2>
        <p>진행중인 경매에 참여하시겠습니까?</p>
        <p>
          시작 입찰가의 30% &#40;<strong>{deposit} Point</strong>&#41;가 차감됩니다.
        </p>
        <div className="flex justify-center mt-4">
          <button onClick={onClose} className="mr-2 bg-db_black hover:bg-gray-600 text-white px-4 py-2 rounded">
            취소
          </button>
          <button onClick={onConfirm} className="bg-db_main hover:bg-db_hover text-white px-4 py-2 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinAuctionModal;
