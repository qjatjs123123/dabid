import React, { useState } from 'react';
import AuctionImage from './AuctionImage';
import AuctionForm from './AuctionForm';

const AuctionInput: React.FC = () => {
  const [images, setImages] = useState<File[]>([]); // 선택한 이미지 상태

  return (
    <>
      {/* <div className="w-full lg:h-[45vh] sm:h-auto bg-[#FEF1AA] px-[15%] flex flex-col lg:flex-row justify-center items-center">
        <div className="flex flex-col mb-8 lg:mb-0 lg:mr-[100px] text-center lg:text-left">
          <div className="text-3xl lg:text-4xl font-bold mb-[15px]">모두가 행복한</div>
          <div className="text-3xl lg:text-4xl font-bold mb-[15px]">비크리 경매</div>
          <div className="text-[16px] lg:text-[20px] font-normal mb-[10px]">입찰자와 구매자가 행복한 거래를</div>
          <div className="text-[16px] lg:text-[20px]">지금 경험해보세요.</div>
        </div>
        <img src="/auction.png" className="h-[25vh] lg:h-[30vh] w-auto"></img>
      </div> */}
      <div className="container mx-auto flex justify-center mt-[40px]">
        <div className="flex flex-col md:flex-row w-full max-w-5xl space-x-4">
          <div className="flex-1">
            <AuctionImage onImagesChange={setImages} /> {/* 이미지 변경 시 상태 업데이트 */}
          </div>
          <div className="flex-1">
            <AuctionForm images={images} /> {/* 선택한 이미지를 AuctionForm에 전달 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionInput;
