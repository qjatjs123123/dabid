import React from 'react';

interface ModalProps {
  auctionId: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const GiveupBiddingModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">경매 참여 포기</h2>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 bg-gray-300 text-black px-4 py-2 rounded">
            취소
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiveupBiddingModal;
