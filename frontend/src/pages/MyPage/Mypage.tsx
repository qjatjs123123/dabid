import React, { useState } from 'react';
import MyInfo from './components/MyInfo';
import Deal from '../Deal/Deal';

const Mypage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('내 정보');

  const renderContent = () => {
    switch (activePage) {
      case '내 정보':
        return <MyInfo />;
      case '내 구매':
        return (
          <div>
            <Deal />
          </div>
        );
      case '내 경매':
        return <div>내 경매</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container w-full border-gray-300 flex flex-col mt-4">
      <nav className="h-[30px]">
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => setActivePage('내 정보')} className="text-blue-600 hover:underline">
              내 정보
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('내 구매')} className="text-blue-600 hover:underline">
              내 구매
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('내 경매')} className="text-blue-600 hover:underline">
              내 경매
            </button>
          </li>
        </ul>
      </nav>
      <div className="m-1">{renderContent()}</div>
    </div>
  );
};

export default Mypage;
