// import React, { useState, useEffect, useRef } from 'react';
// import chatIcon from '../../assets/chatIcon.svg';
// import sendChat from '../../assets/sendChat.svg';
// import SockJS from 'sockjs-client';
// import Stomp, { Client } from 'stompjs';
// import axios from 'axios';
// import { useRecoilValue } from 'recoil';
// import { curDealIdState } from '../../stores/recoilStores/Deal/stateDealId';

// interface Message {
//   dealId: number;
//   memberId: number;
//   content: string;
//   createdAt: string;
// }

// const Chat = () => {
//   const [isOpen, setIsOpen] = useState(false); // 채팅창의 열림/닫힘 상태를 관리
//   const [messages, setMessages] = useState<Message[]>([]); // 받은 메시지 목록
//   const [newMessage, setNewMessage] = useState(''); // 보낼 메시지
//   const stompClient = useRef<Client | null>(null);
//   const [inputValue, setInputValue] = useState('');
//   const messageEndRef = useRef<HTMLDivElement | null>(null);

//   const dealId = useRecoilValue(curDealIdState);
//   const token = localStorage.getItem('accessToken');

//   const connect = () => {
//     const socket = new WebSocket('ws://localhost:8080/api/chat');
//     stompClient.current = Stomp.over(socket)!;
//     if (stompClient.current) {
//       // stompClient.current가 null이 아닌 경우에만 실행
//       stompClient.current.connect({}, () => {
//         // 채팅방 구독
//         stompClient.current?.subscribe(`/sub/chat/room/${dealId}`, (message) => {
//           console.log(message);
//           const newMessage = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });
//       });
//     }
//   };

//   // 기존에 저장돼있던 채팅리스트를 가져옴
//   // http 통신
//   const fetchMessages = () => {
//     return axios.get(`http://localhost:8080/api/deal/chat/${dealId}/messages`).then((response) => {
//       console.log(response.data);
//       setMessages(response.data);
//     });
//   };

//   const disconnect = () => {
//     if (stompClient.current) {
//       stompClient.current.disconnect(() => {
//         console.log('Disconnected from the server');
//       });
//     }
//   };
//   //메세지 전송
//   const sendMessage = () => {
//     if (stompClient.current && newMessage) {
//       const body = {
//         dealId: dealId,
//         memberId: 1,
//         content: newMessage,
//         createdAt: new Date().toISOString().slice(0, -1),
//       };
//       stompClient.current.send(`/pub/chat/message`, {}, JSON.stringify(body));
//       setNewMessage('');
//     }
//   };
//   useEffect(() => {
//     connect();
//     return () => disconnect();
//   }, [dealId]);

//   // 채팅창이 열릴 때 fetchMessages 실행
//   useEffect(() => {
//     if (isOpen) {
//       fetchMessages();
//     }
//   }, [isOpen, dealId]);

//   // dealId가 변경될 때 채팅창을 자동으로 닫음
//   useEffect(() => {
//     setIsOpen(false); // dealId 변경 시 채팅창을 닫음
//     console.log(token);
//   }, [dealId]);

//   const scrollToBottom = () => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: 'auto' });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div className="fixed bottom-10 right-10 z-50">
//       {/* isOpen 상태에 따라 전체 채팅창을 보여줌/숨김 */}
//       {isOpen ? (
//         <>
//           <div className="w-[350px] h-[500px] border border-gray-300 rounded-lg bg-white shadow-lg">
//             {/* 채팅창 헤더 - 창 열기/닫기 버튼 포함 */}
//             <div className="flex justify-between items-center bg-black text-white p-2 rounded-t-lg">
//               <div className="flex space-x-2">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//               </div>
//               {/* 닫기 버튼 */}
//               {/* <button onClick={toggleChat} className="text-white text-xl"> */}
//               <button onClick={() => setIsOpen(false)} className="text-white text-xl">
//                 &times;
//               </button>
//             </div>

//             {/* 채팅창 본문 */}
//             <div className="flex flex-col h-[400px] p-4 overflow-y-auto">
//               {/* 채팅 메시지 */}
//               {messages.map((message, index) => (
//                 <div key={index} className={`mb-4 ${message.memberId === 1 ? 'text-right' : ''}`}>
//                   <div className="text-xs text-gray-500"></div>
//                   <div
//                     className={`mt-1 inline-block py-2 px-4 rounded-md ${message.memberId == 1 ? 'mt-1 py-2 px-4 bg-yellow-500 text-white rounded-md' : 'bg-gray-200'}`}
//                   >
//                     {message.content}
//                   </div>
//                 </div>
//               ))}
//               <div ref={messageEndRef} /> {/* 메시지 끝 부분을 참조하는 div */}
//             </div>
//             {/* 채팅 입력창 */}
//             {/* <form className="flex border-t border-gray-300" onSubmit={handleSendMessage}> */}
//             <form
//               className="flex border-t border-gray-300"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 sendMessage();
//               }}
//             >
//               <input
//                 type="text"
//                 className="flex-grow p-2 border-none focus:outline-none"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Write a message"
//               />
//               <button type="submit" className="p-2 text-white rounded-br-lg">
//                 <img src={sendChat} alt="Chat Icon" className="w-full h-full" />
//               </button>
//             </form>
//           </div>
//         </>
//       ) : (
//         // 채팅창이 닫힌 상태에서는 최소화된 버튼만 표시
//         <button onClick={() => setIsOpen(true)} className="w-16 h-16 flex items-center justify-center rounded-full">
//           <img src={chatIcon} alt="Chat Icon" className="w-full h-full" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect, useRef } from 'react';
import chatIcon from '../../assets/chatIcon.svg';
import sendChat from '../../assets/sendChat.svg';
import { useRecoilValue } from 'recoil';
import { curDealIdState } from '../../stores/recoilStores/Deal/stateDealId';
import { fetchChatMessages } from '../../api/chatApi';
// import { getAccessToken } from '../../util/tokenUtils';
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
  // const token = getAccessToken(); // 토큰 가져오기
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
    <div className="fixed bottom-10 right-10 z-50">
      {isOpen ? (
        <>
          <div className="w-[350px] h-[500px] border border-gray-300 rounded-lg bg-white shadow-lg">
            <div className="flex justify-between items-center bg-black text-white p-2 rounded-t-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white text-xl">
                &times;
              </button>
            </div>

            <div className="flex flex-col h-[400px] p-4 overflow-y-auto">
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
