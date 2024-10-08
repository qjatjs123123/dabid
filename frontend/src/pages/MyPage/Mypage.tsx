import React, { useState } from 'react';
import MyInfo from './components/MyInfo';
import MyCreateList from './components/MyCreateList';
import MyJoinList from './components/MyJoinList';

const Mypage: React.FC = () => {
  const [localActivePage, setLocalActivePage] = useState<string>('내 정보');

  const renderContent = () => {
    switch (localActivePage) {
      case '내 정보':
        return <MyInfo />;
      case '생성한 경매':
        return <MyCreateList />;
      case '참여한 경매':
        return <MyJoinList />;
      default:
        return null;
    }
  };

  return (
    <div className="container w-full border-gray-300 flex flex-col mt-4">
      <nav className="h-[30px]">
        <ul className="flex">
          {['내 정보', '생성한 경매', '참여한 경매'].map((page) => (
            <li key={page}>
              <button
                onClick={() => setLocalActivePage(page)}
                className={`block text-black p-3 ${localActivePage === page ? 'bg-db_main text-white font-bold' : ' '} hover:font-bold`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <br />
      <div>{renderContent()}</div>
      <div className="h-[200px]"></div>
    </div>
  );
};

export default Mypage;
