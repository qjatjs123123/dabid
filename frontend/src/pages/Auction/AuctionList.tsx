import React, { useEffect } from 'react';
import AuctionContainer from './components/Auctions/AuctionContainer';
import { AuctionListDto, auctionListState } from '../../stores/recoilStores/auctionListState';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { getImgUrl } from '../../util/Functions';

const Auction: React.FC = () => {
  const [auctionList, setAuctionList] = useRecoilState(auctionListState);
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('search');

    if (searchTerm) {
      fetchAuctionsBySearchTerm(searchTerm);
    } else {
      fetchAllAuctions();
    }
  }, [location.search]);

  const fetchAuctionsBySearchTerm = async (searchTerm: string) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllAuctions = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('https://j11a505.p.ssafy.io/api/auctions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('전체 목록 요청이 실패했습니다.');
      }

      const data: AuctionListDto[] = await response.json();
      setAuctionList(data); // 전체 목록으로 상태 업데이트
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div className="w-full lg:h-[45vh] sm:h-auto bg-[#FEF1AA] px-[15%] flex flex-col lg:flex-row justify-center items-center">
          <div className="flex flex-col mb-8 lg:mb-0 lg:mr-[100px] text-center lg:text-left">
            <div className="text-3xl lg:text-4xl font-bold mb-[15px]">모두가 행복한</div>
            <div className="text-3xl lg:text-4xl font-bold mb-[15px]">비크리 경매</div>
            <div className="text-[16px] lg:text-[20px] font-normal mb-[10px]">입찰자와 구매자가 행복한 거래를</div>
            <div className="text-[16px] lg:text-[20px]">지금 경험해보세요.</div>
          </div>
          <img src="/auction.png" className="h-[25vh] lg:h-[30vh] w-auto"></img>
        </div>

        <div className="w-full flex justify-center items-center text-4xl font-bold p-[40px]">
          <h1>중고 경매</h1>
        </div>

        {/* <AuctionFilter setAuctionList={setAuctionList} /> */}
        <div className="container mx-auto">
          <AuctionContainer /> {/* setAuctionList 추가 */}
          {auctionList.length === 0 && (
            <div className="flex justify-center items-center">
              <img src={getImgUrl('dabid_tung.png')} alt="휑" className="w-[400px] mx-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auction;
