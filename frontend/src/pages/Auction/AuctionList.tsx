import React, { useState } from 'react';
import AuctionContainer from './components/Auctions/AuctionContainer';
import AuctionFilter from './components/Auctions/AuctionFilter';

export class AuctionListDto {
  auctionId: string;
  title: string;
  thumbnail: string;
  secondBid: string;
  person: number;
  finishedAt: Date;
  createdAt: Date;

  constructor(
    auctionId: string,
    title: string,
    thumbnail: string,
    secondBid: string,
    person: number,
    finishedAt: Date,
    createdAt: Date,
  ) {
    this.auctionId = auctionId;
    this.title = title;
    this.thumbnail = thumbnail;
    this.secondBid = secondBid;
    this.person = person;
    this.finishedAt = finishedAt;
    this.createdAt = createdAt;
  }
}

const Auction: React.FC = () => {
  const [auctionList, setAuctionList] = useState<AuctionListDto[]>([]);

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
          <AuctionContainer auctionList={auctionList} setAuctionList={setAuctionList} /> {/* setAuctionList 추가 */}
        </div>
      </div>
    </div>
  );
};

export default Auction;
