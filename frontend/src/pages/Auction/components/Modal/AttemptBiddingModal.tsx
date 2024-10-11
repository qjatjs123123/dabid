import React from 'react';

interface ModalProps {
  auctionId: number;
  bid: String;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AttemptBiddingModal: React.FC<ModalProps> = ({ bid, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">알림</h2>
        <strong className="font-bold">{bid}</strong> 원으로 입찰을 시도하시겠습니까?
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

export default AttemptBiddingModal;
