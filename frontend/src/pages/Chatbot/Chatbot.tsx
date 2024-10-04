// src/components/Modal.js
import React, { useEffect, useState } from 'react';
import { init, list, send } from '../../api/ChatbotAPI';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ButtonGroup: React.FC<{ onButtonClick: (value: string) => void }> = ({ onButtonClick }) => {
  const buttons = [
    {
      title: 'BidMe?',
      content: '이름이 왜 비드미야?',
    },
    {
      title: '입찰 취소',
      content: '입찰을 취소하고 싶어.',
    },
    {
      title: '낙찰 실패',
      content: '낙찰에 실패한 경매는 어떻게 돼?',
    },
    {
      title: '보증금 환급',
      content: '보증금은 언제 환급받을 수 있어?',
    },
    {
      title: '다비드?',
      content: '다비드는 어떤 서비스야?',
    },
    {
      title: '경매 방식',
      content: '경매는 어떤 방식으로 진행해?',
    },
    {
      title: '고객센터',
      content: '고객센터로 연결해줘.',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {buttons.map((buttonProperty) => (
        <button
          key={buttonProperty.title}
          className="bg-gray-100 p-2 rounded-lg"
          onClick={() => onButtonClick(buttonProperty.content)}
        >
          {buttonProperty.title}
        </button>
      ))}
    </div>
  );
};

const ChatbotModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);
  const [inputValue, setInputValue] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      fetchChatHistory();
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const fetchChatHistory = async () => {
    try {
      const email = 'xorjsghkd1011@gmail.com';
      const history = await list(email);
      if (!history.length) {
        setChatHistory((prev) => [
          ...prev,
          { role: 'assistant', content: '안녕, 나는 비드미! 다비드에 대해 궁금한 게 있으면 언제든 물어봐!' },
        ]);
      }
      setChatHistory(history);
    } catch (error) {
      console.error('대화 내역을 가져오는 데 실패했습니다:', error);
    }
  };

  const handleButtonClick = (value: string) => {
    setInputValue(value);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    try {
      const email = 'xorjsghkd1011@gmail.com';
      const response = await send(email, inputValue);
      setChatHistory((prev) => [
        ...prev,
        { role: 'user', content: inputValue },
        { role: 'assistant', content: response.reply },
      ]);
      setInputValue('');
    } catch (error) {
      console.error('메시지 전송에 실패했습니다:', error);
    }
  };

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
          {chatHistory.map((message, index) => (
            <p key={index} className={`p-2 rounded-lg mb-2 ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              {message.content}
            </p>
          ))}
        </div>
        {/* <div className="mb-4">
          <p className="bg-gray-200 p-2 rounded-lg">
            해당 문제는 고객센터 상담이 필요합니다.
            <br />더 자세한 도움이 필요하다면 문의를 남겨 주세요.
          </p>
          <button className="text-blue-500 underline">고객센터 문의하기 &gt;&gt;</button>
        </div> */}
        <ButtonGroup onButtonClick={handleButtonClick} />
        <div className="flex">
          <input
            className="text-gray-600 mt-4"
            placeholder="다비드에 대해 궁금한 점은 무엇이든 물어보세요!"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 ml-2 rounded-lg" onClick={handleSend}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
