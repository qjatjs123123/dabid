import React, { useState } from 'react';
import AuctionImage from './AuctionImage';
import AuctionForm from './AuctionForm';

const AuctionInput: React.FC = () => {
  const [images, setImages] = useState<File[]>([]); // 선택한 이미지 상태

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-5xl space-x-4">
        <div className="flex-1">
          <AuctionImage onImagesChange={setImages} /> {/* 이미지 변경 시 상태 업데이트 */}
        </div>
        <div className="flex-1">
          <AuctionForm images={images} /> {/* 선택한 이미지를 AuctionForm에 전달 */}
        </div>
      </div>
    </div>
  );
};

export default AuctionInput;
