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
        <AuctionFilter setAuctionList={setAuctionList} />
        <div className="container mx-auto">
          <AuctionContainer auctionList={auctionList} setAuctionList={setAuctionList} /> {/* setAuctionList 추가 */}
        </div>
      </div>
    </div>
  );
};

export default Auction;
