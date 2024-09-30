// src/components/Modal.js
import React, { useEffect, useState } from 'react';
import { getImgUrl } from '../../util/Functions';

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
        className={`bg-gray-100 h-2/3 rounded-3xl shadow-lg max-w-lg w-full mb-10 transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}
      >
        <div className={`bg-white h-20 rounded-3xl flex flex-col justify-center`}>
          <div className="flex items-center">
            <img src={getImgUrl('floating/bank.png')} alt="다비드뱅크" className="m-4 mr-0" />
            <h2 className="text-2xl px-4">다비드뱅크에 오신 것을 환영합니다.</h2>
            <button
              onClick={onClose}
              className="absolute text-3xl top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="닫기"
            >
              &times;
            </button>
          </div>
        </div>
        <div className={'p-6'}>
          <div className={`bg-white flex flex-col h-36 justify-evenly px-6 rounded-3xl`}>
            <div>
              <p className="text-4xl font-semibold">
                <i>123-4567890-123</i>
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">
                <i>10,000,000 </i>원
              </p>
            </div>
          </div>

          <div className={`bg-white h-72 mt-6 py-1 px-4 rounded-3xl`}>
            <h3 className="mt-6 text-2xl font-bold">최근 거래 내역</h3>
            <div className="mt-2">
              <p className="text-gray-600">09/03</p>
              <p className="text-green-500">+ 30,000 다비드 포인트 환전 13:01</p>
              <p className="text-red-500">- 30,000 다비드 낙찰금 결제 13:01</p>
              <p className="text-gray-600">09/01</p>
              <p className="text-red-500">- 30,000 다비드 포인트 결제 13:01</p>
              <p className="text-green-500">+ 1 다비드 계좌 인증 0123 13:01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankModal;
