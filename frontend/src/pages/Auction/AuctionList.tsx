import AuctionContainer from './components/Auctions/AuctionContainer';
import AuctionFilter from './components/Auctions/AuctionFilter';

const Auction = () => {
  return (
    <div className="container mx-auto">
      <div className="relative flex">
        <AuctionFilter />
        <AuctionContainer />
      </div>
    </div>
  );
};

export default Auction;
