// src/components/FloatingActionButtons.js
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../stores/recoilStores/Member/loginState';
import { getImgUrl } from '../../util/Functions';
import BankModal from '../../pages/Bank/Bank';
import ChatbotModal from '../../pages/Chatbot/Chatbot';

interface FloatingActionButtonsProps {
  setIsBankOpenDeal: (isOpen: boolean) => void;
  setIsChatbotOpenDeal: (isOpen: boolean) => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ setIsBankOpenDeal, setIsChatbotOpenDeal }) => {
  const isLoggedIn = useRecoilValue(loginState);

  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openBank = () => {
    setIsBankOpenDeal(true);
    setIsBankOpen(true); // 부모 컴포넌트에도 상태 전달
  };
  const closeBank = () => {
    setIsBankOpen(false);
    setIsBankOpenDeal(false);
  };
  const openChatbot = () => {
    setIsChatbotOpen(true);
    setIsChatbotOpenDeal(true);
  };
  const closeChatbot = () => {
    setIsChatbotOpen(false);
    setIsChatbotOpenDeal(false);
  };

  if (!isLoggedIn) return null; // 로그인하지 않은 경우 버튼 숨김

  return (
    <div className="fixed bottom-12 right-10 flex flex-col space-y-3">
      <button
        style={{
          backgroundImage: `url(${getImgUrl('floating/bankIcon.svg')})`,
          backgroundSize: '75% 75%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center', // 이미지 위치 조정
        }}
        className="h-[50px] w-[50px] rounded-full shadow-lg bg-white"
        onClick={openBank}
      ></button>
      <BankModal isOpen={isBankOpen} onClose={closeBank} />

      <button
        style={{
          backgroundImage: `url(${getImgUrl('floating/bidme.svg')})`,
          backgroundSize: '75% 70%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center', // 이미지 위치 조정
        }}
        className="h-[50px] w-[50px] rounded-full shadow-lg bg-white"
        onClick={openChatbot}
      ></button>
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  );
};

export default FloatingActionButtons;
