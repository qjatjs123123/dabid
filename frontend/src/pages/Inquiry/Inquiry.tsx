import React, { useState } from 'react';
import InquiryList from './InquiryList';
import InquiryInput from './InquiryInput';

const Inquiry = () => {
  const [activePage, setActivePage] = useState<string>('문의 목록');

  const renderContent = () => {
    switch (activePage) {
      case '문의 목록':
        return <InquiryList />;
      case '문의 작성':
        return <InquiryInput />;

      default:
        return null;
    }
  };

  return (
    <div className="container w-full border-gray-300 flex flex-col mt-4 p-6">
      {activePage === '문의 목록' && (
        <button onClick={() => setActivePage('문의 작성')} className="text-left w-[110px]">
          ▶ 문의 작성
        </button>
      )}
      {activePage === '문의 작성' && (
        <button onClick={() => setActivePage('문의 목록')} className="text-left w-[110px]">
          ▶ 문의 목록
        </button>
      )}
      <div className="m-1">{renderContent()}</div>
    </div>
  );
};

export default Inquiry;
