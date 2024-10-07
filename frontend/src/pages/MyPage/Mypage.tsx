import React, { useState } from 'react';
import MyInfo from './components/MyInfo';
import Deal from '../Deal/Deal';
import MyCreateList from './components/MyCreateList';
import MyJoinList from './components/MyJoinList';
import { useRecoilState } from 'recoil';
import { activePageState } from '../../stores/recoilStores/activePageState';

const Mypage: React.FC = () => {
  const [localActivePage, setLocalActivePage] = useState<string>('내 정보');
  const [activePage, setActivePage] = useRecoilState(activePageState);

  const renderContent = () => {
    switch (localActivePage) {
      case '내 정보':
        return <MyInfo />;
      case '내 거래':
        return <Deal />;
      case '생성한 경매':
        return <MyCreateList />;
      case '참여한 경매':
        return <MyJoinList />;
      default:
        return null;
    }
  };

  const handlePageChange = (page: string) => {
    setLocalActivePage(page); // 로컬 상태 업데이트
    setActivePage(page); // App의 activePage 상태 업데이트
  };

  return (
    <div className="container w-full border-gray-300 flex flex-col mt-4">
      <nav className="h-[30px]">
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => handlePageChange('내 정보')} className="text-blue-600 hover:underline">
              내 정보
            </button>
          </li>
          <li>
            <button onClick={() => handlePageChange('내 거래')} className="text-blue-600 hover:underline">
              내 거래
            </button>
          </li>
          <li>
            <button onClick={() => handlePageChange('생성한 경매')} className="text-blue-600 hover:underline">
              생성한 경매
            </button>
          </li>
          <li>
            <button onClick={() => handlePageChange('참여한 경매')} className="text-blue-600 hover:underline">
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
