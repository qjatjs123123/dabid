// src/components/Modal.js
import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BankModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-end justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full mb-10 transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}
      >
        <h2 className="text-xl font-bold mb-4">다비드뱅크에 오신 것을 환영합니다.</h2>
        <p className="text-2xl font-semibold">123-4567890-123</p>
        <p className="text-2xl font-semibold">10,000,000 원</p>

        <h3 className="mt-6 font-bold">최근 거래 내역</h3>
        <div className="mt-2">
          <p className="text-gray-600">09/03</p>
          <p className="text-green-500">+ 30,000 다비드 포인트 환전 13:01</p>
          <p className="text-red-500">- 30,000 다비드 낙찰금 결제 13:01</p>
          <p className="text-gray-600">09/01</p>
          <p className="text-red-500">- 30,000 다비드 포인트 결제 13:01</p>
          <p className="text-green-500">+ 1 다비드 계좌 인증 0123 13:01</p>
        </div>

        <button onClick={onClose} className="mt-4 bg-blue-500 text-white p-2 rounded">
          닫기
        </button>
      </div>
    </div>
  );
};

export default BankModal;
