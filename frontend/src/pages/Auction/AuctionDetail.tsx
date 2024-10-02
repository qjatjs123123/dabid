import AuctionDetailImage from './components/AuctionDetailImage';
import AuctionBiddingInfo from './components/AuctionBiddingInfo';

const AuctionDeatil = () => {
  return (
    <div className="container">
      <div className="flex flex-row">
        <div className="flex-12">경매품 제목</div>
      </div>

      <div className="flex flex-row">
        <div className="flex-6">
          <AuctionDetailImage />
        </div>
        <div className="flex-6">
          <AuctionBiddingInfo />
        </div>
      </div>
    </div>
  );
};

export default AuctionDeatil;
