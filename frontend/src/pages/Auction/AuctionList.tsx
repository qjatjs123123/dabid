import AuctionContainer from './components/AuctionContainer';
import AuctionFilter from './components/AuctionFilter';

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
