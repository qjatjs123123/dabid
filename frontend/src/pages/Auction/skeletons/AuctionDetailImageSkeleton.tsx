import React, { useState } from 'react';

const images = [
  'https://via.placeholder.com/300x200?text=Image+1',
  'https://via.placeholder.com/300x200?text=Image+2',
  'https://via.placeholder.com/300x200?text=Image+3',
];

const AuctionDetailImageSkeleton: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex flex-col items-center">
      {/* 큰 이미지 표시 영역 */}
      <div className="w-full mb-4">
        <img
          src={images[selectedIndex]}
          alt={`Selected Image ${selectedIndex + 1}`}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* 가로로 정렬된 이미지와 화살표 */}
      <div className="flex items-center space-x-4">
        {/* 왼쪽 화살표 */}
        <button onClick={handlePrev} className="text-3xl font-bold p-2">
          &lt;
        </button>

        {/* 가로로 정렬된 이미지들 */}
        <div className="flex space-x-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className={`w-32 h-20 object-cover cursor-pointer border-2 ${
                index === selectedIndex ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>

        {/* 오른쪽 화살표 */}
        <button onClick={handleNext} className="text-3xl font-bold p-2">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AuctionDetailImageSkeleton;

//   <div className="flex-3 h-full px-[200px]">
//       <div className="h-[400px] w-full rounded-lg mb-4 bg-gray-200 animate-pulse"></div>
//       <div className="h-[30px] w-full rounded-lg mb-4 bg-gray-200 animate-pulse mt-4 mb-[8px]"></div>
//     </div>
