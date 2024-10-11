import React from 'react';

interface ModalProps {
  modalResultMessage: String;
  isOpen: boolean;
  onClose: () => void;
}

const BiddingResultModal: React.FC<ModalProps> = ({ isOpen, onClose, modalResultMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">알림</h2>
        <div>{modalResultMessage}</div>
        <div className="flex justify-center mt-4">
          <button onClick={onClose} className="bg-db_black hover:bg-gray-600 text-white px-4 py-2 rounded">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiddingResultModal;
