import React, { useState } from 'react';
import MyCreateContatiner from './MyCreateContatiner';

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
        <div className="container mx-auto">
          <MyCreateContatiner auctionList={auctionList} setAuctionList={setAuctionList} />
        </div>
      </div>
    </div>
  );
};

export default Auction;
