import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuctionFilter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="filter-container w-1/6 p-4 fixed h-auto border border-gray-300 bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">검색 필터</h2>
      <input type="text" placeholder="검색어 입력" className="w-full mb-2 p-2 border border-gray-300 rounded" />
      <button className="w-full p-2 bg-blue-500 text-white rounded">검색</button>
      <br />
      <br />
      <button onClick={() => navigate('/auction/input')} className="w-full p-2 bg-red-500 text-white rounded">
        경매글 쓰기
      </button>
    </div>
  );
};

export default AuctionFilter;
