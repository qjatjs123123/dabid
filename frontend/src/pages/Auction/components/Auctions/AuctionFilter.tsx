import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuctionListDto } from '../../AuctionList'; // 경로를 조정하여 AuctionListDto 가져오기

interface AuctionFilterProps {
  setAuctionList: React.Dispatch<React.SetStateAction<AuctionListDto[]>>;
}

const AuctionFilter: React.FC<AuctionFilterProps> = ({ setAuctionList }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
  const navigate = useNavigate();

  const handleSearch = async () => {
    // if (!searchTerm) return; // 검색어가 비어있으면 요청하지 않음

    const accessToken = localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기

    try {
      // SearchAuctionTitle DTO 형식으로 요청 본문을 구성
      const requestBody = JSON.stringify({ title: searchTerm });

      const response = await fetch('https://j11a505.p.ssafy.io/api/auctions/title', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: requestBody, // 구성한 요청 본문 전송
      });

      if (!response.ok) {
        throw new Error('검색 요청이 실패했습니다.');
      }

      const data: AuctionListDto[] = await response.json();
      setAuctionList(data); // 검색 결과를 상태로 업데이트
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="filter-container w-1/6 p-4 fixed h-auto border border-gray-300 bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">검색 필터</h2>
      <input
        type="text"
        placeholder="검색어 입력"
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 입력값 업데이트
      />
      <button
        className="w-full p-2 bg-blue-500 text-white rounded"
        onClick={handleSearch} // 검색 버튼 클릭 시 요청 보내기
      >
        검색
      </button>
      <br />
      <br />
      <button onClick={() => navigate('/auction/input')} className="w-full p-2 bg-red-500 text-white rounded">
        경매글 쓰기
      </button>
    </div>
  );
};

export default AuctionFilter;
