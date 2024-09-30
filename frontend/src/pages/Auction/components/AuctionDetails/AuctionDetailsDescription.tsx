const text = '첫 번째 줄\n두 번째 줄\n세 번째 줄\n네 번째 줄\n다섯 번째 줄\n여섯 번째 줄\n일곱 번째 줄\n여덟 번째 줄';

const AuctionDetailImage: React.FC = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-5 bg-white">
      <div className="font-bold text-xl mb-2">물품 정보</div>
      <div className="text-gray-700 text-base">
        {text.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default AuctionDetailImage;
