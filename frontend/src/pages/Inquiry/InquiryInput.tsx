import React, { useState } from 'react';
import InquiryImage from './InquiryImage';
import InquiryForm from './InquiryForm';

const InquiryInput: React.FC = () => {
  const [images, setImages] = useState<File[]>([]); // 선택한 이미지 상태

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row w-full max-w-5xl space-x-4">
        <div className="flex-1">
          <InquiryImage onImagesChange={setImages} />
        </div>
        <div className="flex-1">
          <InquiryForm images={images} />
        </div>
      </div>
    </div>
  );
};

export default InquiryInput;
