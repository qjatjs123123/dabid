import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_URL } from '../../../../util/Constants';
import { auctionListState, AuctionListDto } from '../../../../stores/recoilStores/auctionListState';
import { useRecoilState } from 'recoil';
import { FaSearch } from 'react-icons/fa';

const AuctionSearch: React.FC = () => {
  const [_, setAuctionList] = useRecoilState(auctionListState);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const requestBody = JSON.stringify({ title: searchTerm });

      const response = await fetch('https://j11a505.p.ssafy.io/api/auctions/title', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error('검색 요청이 실패했습니다.');
      }

      const data: AuctionListDto[] = await response.json();
      setAuctionList(data); // 검색 결과로 상태 업데이트
      navigate(`${PAGE_URL.AUCTION_LIST}?search=${searchTerm}`); // 검색 결과 페이지로 이동
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className={`container bg-gray-100 rounded flex flex-row items-center ${isFocus ? 'border-2 border-db_main' : ''}`}
    >
      <FaSearch className="text-gray-400 my-2 ml-4 cursor-pointer" onClick={handleSearch} />
      <input
        type="text"
        placeholder="원하는 물건을 검색해 보세요!"
        className="w-full p-4 text-md bg-gray-100 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default AuctionSearch;
