interface AuctionDetailsDescriptionProps {
  detail: string;
}

const AuctionDetailsDescription: React.FC<AuctionDetailsDescriptionProps> = ({ detail }) => {
  return (
    <div className="w-full rounded overflow-hidden p-5 bg-[#F2F4F6] p-5 rounded-lg mr-4 mb-5 mr-4">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="font-bold text-xl mb-2">물품 정보</div>
        <div className="text-gray-700 text-base">
          {detail.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailsDescription;
