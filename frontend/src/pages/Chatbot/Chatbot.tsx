// src/components/Modal.js
import React, { useEffect, useState, useRef } from 'react';
import { list, send } from '../../api/ChatbotAPI';
import { getImgUrl } from '../../util/Functions';
import { UserInfo, userState } from '../../stores/recoilStores/Member/userState';
import { useRecoilState } from 'recoil';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ButtonGroup: React.FC<{ onButtonClick: (value: string) => void }> = ({ onButtonClick }) => {
  const buttons = [
    {
      title: 'BidMe',
      content: '이름이 왜 비드미야?',
    },
    {
      title: '다비드',
      content: '다비드는 어떤 서비스야?',
    },
    {
      title: '경매 방식',
      content: '경매는 어떤 방식으로 진행해?',
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
      title: '거래 절차',
      content: '거래는 어떤 방식으로 진행해?',
    },
    {
      title: '고객센터',
      content: '고객센터로 연결해줘.',
    },
    {
      title: '테스트 계좌',
      content: '테스트 계좌는 뭐야?',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {buttons.map((buttonProperty) => (
        <button
          key={buttonProperty.title}
          className="bg-gray-300 p-2 rounded-lg"
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null); // 대화창을 위한 ref
  const [userInfo] = useRecoilState<UserInfo | null>(userState);

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
      const email = userInfo ? userInfo.email : ''; // 'xorjsghkd1011@gmail.com';
      if (email === '') return;

      const history = await list(email);

      if (!history.length) {
        history.push({
          role: 'assistant',
          content: '안녕, 나는 비드미! 다비드에 대해 궁금한 게 있으면 언제든 물어봐!',
        });
      }
      setChatHistory(history);
    } catch (error) {
      console.error('대화 내역을 가져오는 데 실패했습니다:', error);
    }
  };

  const handleButtonClick = (value: string) => {
    setInputValue(value);
    handleSend(value);
  };

  const handleSend = async (messageToSend: string | null = null) => {
    const message = messageToSend || inputValue; // 버튼 클릭 시 메시지 사용
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { role: 'user', content: message }]);

    try {
      const email = userInfo ? userInfo.email : ''; // 'xorjsghkd1011@gmail.com';
      if (email === '') return;
      const response = await send(email, message);
      setChatHistory((prev) => [...prev, { role: 'assistant', content: response.reply }]);
      setInputValue('');
    } catch (error) {
      console.error('메시지 전송에 실패했습니다:', error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // 대화창 닫기
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // 바깥 영역 클릭 감지
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // 정리
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-end justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        ref={modalRef} // 대화창을 위한 ref 추가
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full mb-10 transition-transform duration-300 transform ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'} h-[700px] flex flex-col`} // Flexbox 설정
      >
        <div className="flex items-center mb-4">
          <div
            style={{
              backgroundImage: `url(${getImgUrl('floating/bidme.png')})`,
              backgroundSize: '75% 75%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            className="h-14 w-16 mr-4 rounded-full shadow-lg"
          ></div>
          <h2 className="text-xl font-bold">BidMe: 다비드 AI 챗봇</h2>
          <button
            onClick={onClose}
            className="absolute text-3xl top-4 right-4 text-gray-600 hover:text-gray-900"
            aria-label="닫기"
          >
            &times;
          </button>
        </div>

        <div className="flex-grow mb-4 overflow-y-auto">
          {' '}
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <p className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                {message.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ButtonGroup onButtonClick={handleButtonClick} />

        <div className="flex mt-4">
          {' '}
          <input
            className="text-gray-600 flex-grow border border-gray-300 rounded-lg p-2"
            placeholder="다비드에 대해 궁금한 점은 무엇이든 물어보세요!"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button className="bg-blue-500 text-white p-2 ml-2 rounded-lg" onClick={() => handleSend()}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
