// import useAuctionDetail from '../../../business/hooks/useDeal/useDealContentDetail';
import React, { useState, useRef, useEffect } from 'react';
import AuctionDeatilImageSkeleton from '../../skeletons/AuctionDetailImageSkeleton';

// const images = [
//   '/auctionTestImage/먹다 남은 사과.png',
//   '/auctionTestImage/먹다 남은 사과2.png',
//   '/auctionTestImage/먹다 남은 배.png',
// ];

interface AuctionDetailsImageProps {
  images: string[];
}

const AuctionDetailsImage: React.FC<AuctionDetailsImageProps> = ({ images }) => {
  // if (showSkeleton || !auctionDetail) {
  if (false) {
    return <AuctionDeatilImageSkeleton />;
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (imageRefs.current[selectedIndex]) {
      imageRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedIndex]);

  return (
    <div className="bg-gray-100 flex flex-col items-center mt-4 mb-4 p-5 rounded-lg ">
      {/* 큰 이미지 표시 영역 */}
      <div className="w-full mb-4 grid place-items-center">
        <img
          src={images[selectedIndex]}
          alt={`Selected Image ${selectedIndex + 1}`}
          className="w-[400px] h-[300px] object-cover rounded-lg"
        />
      </div>

      {/* 가로로 정렬된 이미지와 화살표 */}
      <div className="flex items-center space-x-4 flex-wrap sm:flex-nowrap">
        {/* 왼쪽 화살표 */}
        <button onClick={handlePrev} className="bg-gray-300 text-3xl font-bold p-2 rounded-lg">
          <i className="fa fa-chevron-left"></i>
        </button>

        {/* 가로로 정렬된 이미지들 */}
        <div className="flex space-x-4 overflow-x-auto scroll-hide">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className={`w-32 h-20 object-cover cursor-pointer border-2 rounded-lg ${
                index === selectedIndex ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedIndex(index)}
              ref={(el) => (imageRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* 오른쪽 화살표 */}
        <button onClick={handleNext} className="bg-gray-300 text-3xl font-bold p-2 rounded-lg">
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default AuctionDetailsImage;
