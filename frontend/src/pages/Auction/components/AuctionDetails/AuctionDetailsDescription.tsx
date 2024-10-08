interface AuctionDetailsDescriptionProps {
  detail: string;
}

const AuctionDetailsDescription: React.FC<AuctionDetailsDescriptionProps> = ({ detail }) => {
  return (
    <div className="rounded overflow-hidden shadow-2xl m-4 p-5 bg-[#F2F4F6] p-5 rounded-lg">
      <div className="bg-white p-5 rounded-lg">
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
