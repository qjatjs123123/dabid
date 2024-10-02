// src/components/FloatingActionButtons.js
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../stores/recoilStores/Member/loginState';
import { getImgUrl } from '../../util/Functions';
import BankModal from '../../pages/Bank/Bank';
import ChatbotModal from '../../pages/Chatbot/Chatbot';

const FloatingActionButtons = () => {
  const isLoggedIn = useRecoilValue(loginState);

  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openBank = () => setIsBankOpen(true);
  const closeBank = () => setIsBankOpen(false);
  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);

  if (isLoggedIn) return null; // 로그인하지 않은 경우 버튼 숨김

  return (
    <div className="fixed bottom-10 right-10 flex flex-col space-y-5">
      <button
        style={{
          backgroundImage: `url(${getImgUrl('floating/bank.png')})`,
          backgroundSize: '75% 75%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center', // 이미지 위치 조정
        }}
        className="h-20 w-20 rounded-full shadow-lg"
        onClick={openBank}
      ></button>
      <BankModal isOpen={isBankOpen} onClose={closeBank} />

      <button
        style={{
          backgroundImage: `url(${getImgUrl('floating/bidme.png')})`,
          backgroundSize: '75% 70%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center', // 이미지 위치 조정
        }}
        className="h-20 w-20 rounded-full shadow-lg"
        onClick={openChatbot}
      ></button>
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  );
};

export default FloatingActionButtons;
