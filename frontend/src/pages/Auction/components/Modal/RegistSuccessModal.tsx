import React from 'react';

// Props의 타입 정의
interface RegistSuccessModalProps {
  isRegistSuccessOpen: boolean; // 모달이 열려있는지 여부
  onRegistSuccessClose: () => void; // 모달 닫기 함수
}

const RegistSuccessModal: React.FC<RegistSuccessModalProps> = ({ isRegistSuccessOpen, onRegistSuccessClose }) => {
  if (!isRegistSuccessOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">알림</h2>
        <p>경매가 성공적으로 등록되었습니다.</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onRegistSuccessClose}
            className="mr-2 bg-db_black hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistSuccessModal;
