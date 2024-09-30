// src/components/FloatingActionButtons.js
import React from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../stores/recoilStores/Member/loginState';
import { getImgUrl } from '../../util/Functions';

const FloatingActionButtons = () => {
  const isLoggedIn = useRecoilValue(loginState);

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
      ></button>
      <button
        style={{
          backgroundImage: `url(${getImgUrl('floating/bidme.png')})`,
          backgroundSize: '75% 70%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center', // 이미지 위치 조정
        }}
        className="h-20 w-20 rounded-full shadow-lg"
      ></button>
    </div>
  );
};

export default FloatingActionButtons;
