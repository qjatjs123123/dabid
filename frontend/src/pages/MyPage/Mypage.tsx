import React, { useState } from 'react';
import MyInfo from './components/MyInfo';

const Mypage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('내정보');

  const renderContent = () => {
    switch (activePage) {
      case '내정보':
        return <MyInfo />;
      case '내구매':
        return <div>내 구매 내용입니다.</div>;
      case '내결제':
        return <div>내 결제 내용입니다.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container w-full border-gray-300 flex items-end mt-4">
      <nav className="mb-4 h-[50px]">
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => setActivePage('내정보')} className="text-blue-600 hover:underline">
              내 정보
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('내구매')} className="text-blue-600 hover:underline">
              내 구매
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('내결제')} className="text-blue-600 hover:underline">
              내 결제
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default Mypage;
