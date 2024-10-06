import React from 'react';

// Props의 타입 정의
interface RegistSuccessModalProps {
  isRegistSuccessOpen: boolean; // 모달이 열려있는지 여부
  onRegistSuccessClose: () => void; // 모달 닫기 함수
}

const RegistSuccessModal: React.FC<RegistSuccessModalProps> = ({ isRegistSuccessOpen, onRegistSuccessClose }) => {
  if (!isRegistSuccessOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">경매가 성공적으로 등록되었습니다.</h2>
        <div className="flex justify-end">
          {' '}
          <button
            onClick={onRegistSuccessClose}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistSuccessModal;
