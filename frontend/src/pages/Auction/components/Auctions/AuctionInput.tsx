import AuctionImage from './AuctionImage';
import AuctionForm from './AuctionForm';

const AuctionInput: React.FC = () => {
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-5xl space-x-4">
        <div className="flex-1">
          <AuctionImage />
        </div>
        <div className="flex-1">
          <AuctionForm />
        </div>
      </div>
    </div>
  );
};

export default AuctionInput;
