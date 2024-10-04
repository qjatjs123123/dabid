import React, { useState } from 'react';
import { INQUIRY_API_URL } from '../../util/Constants';
import axios from '../../api/axiosConfig';

import InquiryImage from './InquiryImage';
import InquiryForm from './InquiryForm';

const InquiryInput: React.FC = () => {
  const [images, setImages] = useState<File[]>([]); // 선택한 이미지 상태

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-5xl space-x-4">
        <div className="flex-1">
          <InquiryImage onImagesChange={setImages} /> {/* 이미지 변경 시 상태 업데이트 */}
        </div>
        <div className="flex-1">
          <InquiryForm images={images} /> {/* 선택한 이미지를 InquiryForm에 전달 */}
        </div>
      </div>
    </div>
  );
};

export default InquiryInput;
