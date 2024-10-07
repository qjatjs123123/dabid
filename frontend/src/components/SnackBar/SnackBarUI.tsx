import React from 'react';
import { useRecoilValue } from 'recoil';
import { apiState } from '../../stores/recoilStores/Message/apiState';

const SnackBarUI = () => {
  const apiInfo = useRecoilValue(apiState);
  const isActive = apiInfo.state;

  return (
    <div
      className={`fixed w-[220px] h-[50px] bg-[#333333] text-white z-50 pr-[20px] pl-[20px] left-1/2 transform -translate-x-1/2 rounded-t-lg flex items-center justify-center text-center transition-all ${
        isActive ? 'bottom-0' : 'bottom-[-50px]'
      }`}
    >
      <span className="font-bold">{apiInfo.message}</span>
    </div>
  );
};

export default SnackBarUI;
