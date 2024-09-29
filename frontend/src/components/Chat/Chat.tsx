import React, { useState, useEffect, useRef } from 'react';
import chatIcon from '../../assets/chat/chatIcon.svg';
import sendChat from '../../assets/chat/sendChat.svg';
import { useRecoilValue } from 'recoil';
import { curDealIdState } from '../../stores/recoilStores/Deal/stateDealId';
import { fetchChatMessages } from '../../api/chatApi';
import useWebSocket from '../../business/hooks/useDeal/useDealWebsocket';

interface Message {
  dealId: number;
  memberId: number;
  content: string;
  createdAt: string;
}

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false); // 채팅창 열림/닫힘 상태
  const [messages, setMessages] = useState<Message[]>([]); // 메시지 목록
  const [newMessage, setNewMessage] = useState(''); // 새 메시지
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const dealId = useRecoilValue(curDealIdState); // 현재 거래 ID
  const token = localStorage.getItem('accessToken'); // 토큰 가져오기
  const memberId = 1; // 로그인한 사용자 ID

  // 웹소켓 훅을 사용해 메시지를 수신하고 전송
  const { sendMessage, disconnect } = useWebSocket(dealId, (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]); // 새 메시지를 수신하면 추가
  });

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (newMessage && memberId) {
      const body = {
        dealId,
        memberId,
        content: newMessage,
        createdAt: new Date().toISOString().slice(0, -1),
      };
      sendMessage(body); // 웹소켓을 통해 메시지 전송
      setNewMessage(''); // 메시지 입력 필드 초기화
    }
  };

  // 채팅창이 열릴 때 메시지 목록 불러오기
  useEffect(() => {
    if (isOpen) {
      fetchChatMessages(dealId).then((data) => setMessages(data));
      console.log(token);
    }
  }, [isOpen, dealId]);

  // 거래 ID 변경 시 채팅창 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [dealId]);

  // 스크롤을 맨 아래로 내리기
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-10 right-10 z-50 noto-sans-kr-bold">
      {isOpen ? (
        <>
          <div className="w-[350px] h-[500px] border border-gray-300 rounded-lg bg-white shadow-lg">
            <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded-t-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white text-xl">
                &times;
              </button>
            </div>

            <div className="flex flex-col h-[400px] p-4 overflow-y-auto scroll-hide">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.memberId === memberId ? 'text-right' : ''}`}>
                  <div className="text-xs text-gray-500"></div>
                  <div
                    className={`mt-1 inline-block py-2 px-4 rounded-md ${message.memberId === memberId ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <form
              className="flex border-t border-gray-300"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                className="flex-grow p-2 border-none focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a message"
              />
              <button type="submit" className="p-2 text-white rounded-br-lg">
                <img src={sendChat} alt="Chat Icon" className="w-full h-full" />
              </button>
            </form>
          </div>
        </>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-16 h-16 flex items-center justify-center rounded-full">
          <img src={chatIcon} alt="Chat Icon" className="w-full h-full" />
        </button>
      )}
    </div>
  );
};

export default Chat;
