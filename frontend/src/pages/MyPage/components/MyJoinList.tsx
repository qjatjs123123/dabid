import React, { useState } from 'react';
import MyJoinContatiner from './MyJoinContatiner';
import { getImgUrl } from '../../../util/Functions';

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
          <MyJoinContatiner auctionList={auctionList} setAuctionList={setAuctionList} />
          {auctionList.length === 0 && (
            <div className="flex justify-center items-center">
              <img src={getImgUrl('dabid_tung.png')} alt="휑" className="w-[400px] m-[100px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auction;
