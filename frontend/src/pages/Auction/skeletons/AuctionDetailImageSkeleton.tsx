import React, { useState, useRef, useEffect } from 'react';

const images = [
  'https://via.placeholder.com/300x200?text=Image+1',
  'https://via.placeholder.com/300x200?text=Image+2',
  'https://via.placeholder.com/300x200?text=Image+3',
];

const AuctionDetailImageSkeleton: React.FC = () => {
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
    <div className="flex flex-col items-center m-4">
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
        <button onClick={handlePrev} className="text-3xl font-bold p-2">
          &lt;
        </button>

        {/* 가로로 정렬된 이미지들 */}
        <div className="flex space-x-4 overflow-x-auto">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className={`w-32 h-20 object-cover cursor-pointer border-2 ${
                index === selectedIndex ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedIndex(index)}
              ref={(el) => (imageRefs.current[index] = el)}
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

// 7번째 팀원 GPT의 코드 설명:
// 1. 이미지 배열: images 배열에 3개의 이미지를 넣어 관리하고 있습니다. URL을 통해 placeholder 이미지를 사용하였지만, 실제 사용시 적절한 이미지를 넣으면 됩니다.
// 2. 상태 관리: useState 훅을 이용해 선택된 이미지를 selectedIndex로 관리합니다. 기본값은 첫 번째 이미지로 설정됩니다.
// 3. 핸들러 함수: handlePrev와 handleNext 함수는 좌우 화살표를 클릭할 때 이미지의 인덱스를 변경합니다.
// 4. 이미지 표시: 선택된 이미지는 큰 사이즈로 상단에 표시되며, 하단에는 3개의 이미지를 가로로 정렬하여 표시합니다.
// 5. 이미지 클릭: 하단의 이미지를 클릭하면 해당 이미지가 선택되어 상단에 크게 표시됩니다.
