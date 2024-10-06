import React, { useState } from 'react';
import MyInfo from './components/MyInfo';
import Deal from '../Deal/Deal';
import AuctionMyList from '../Auction/AuctionMyList';

const Mypage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('내 정보');

  const renderContent = () => {
    switch (activePage) {
      case '내 정보':
        return <MyInfo />;
      case '내 거래':
        return (
          <div>
            <Deal />
          </div>
        );
      case '생성한 경매':
        return (
          <div>
            <AuctionMyList />
          </div>
        );
      case '참여한 경매':
        return (
          <div>
            <AuctionMyList />
          </div>
        );
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
            <button onClick={() => setActivePage('내 거래')} className="text-blue-600 hover:underline">
              내 거래
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('생성한 경매')} className="text-blue-600 hover:underline">
              생성한 경매
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('참여한 경매')} className="text-blue-600 hover:underline">
              참여한 경매
            </button>
          </li>
        </ul>
      </nav>
      <div className="m-1">{renderContent()}</div>
      <div className="h-[200px]"></div>
    </div>
  );
};

export default Mypage;
