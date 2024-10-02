// src/components/Modal.js
import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // 애니메이션 시간과 일치
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-end justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full mb-10 transition-transform duration-300 transform ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="닫기"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">BidMe: 다비드 AI 챗봇</h2>
        <div className="mb-4">
          <p className="bg-gray-200 p-2 rounded-lg">안녕, 나는 비드미! 다비드에 대해 궁금한 게 있으면 물어봐!</p>
          <p className="bg-blue-100 p-2 rounded-lg mt-2">거래 사기를 당한 것 같아.</p>
        </div>
        <div className="mb-4">
          <p className="bg-gray-200 p-2 rounded-lg">
            해당 문제는 고객센터 상담이 필요합니다.
            <br />더 자세한 도움이 필요하다면 문의를 남겨 주세요.
          </p>
          <button className="text-blue-500 underline">고객센터 문의하기 &gt;&gt;</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="bg-gray-100 p-2 rounded-lg">이름이 왜 비드미야?</button>
          <button className="bg-gray-100 p-2 rounded-lg">입찰을 취소하고 싶어.</button>
          <button className="bg-gray-100 p-2 rounded-lg">낙찰되지 않은 경매는 어떻게 돼?</button>
          <button className="bg-gray-100 p-2 rounded-lg">보증금은 언제 환급받을 수 있어?</button>
          <button className="bg-gray-100 p-2 rounded-lg">다비드는 어떤 서비스야?</button>
          <button className="bg-gray-100 p-2 rounded-lg">경매는 어떤 방식으로 진행해?</button>
          <button className="bg-gray-100 p-2 rounded-lg">고객센터</button>
        </div>
        <div className="flex">
          <input className="text-gray-600 mt-4" placeholder="다비드에 대해 궁금한 점은 무엇이든 물어보세요!"></input>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
