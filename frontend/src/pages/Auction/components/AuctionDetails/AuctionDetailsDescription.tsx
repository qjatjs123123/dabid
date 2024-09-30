interface AuctionDetailsDescriptionProps {
  detail: string;
}

const AuctionDetailsDescription: React.FC<AuctionDetailsDescriptionProps> = ({ detail }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-5 bg-white">
      <div className="font-bold text-xl mb-2">물품 정보</div>
      <div className="text-gray-700 text-base">
        {detail.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default AuctionDetailsDescription;
