import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import { INQUIRY_API_URL, PAGE_URL } from '../../util/Constants';
import axios from '../../api/axiosConfig';

interface InquiryFormProps {
  images: File[];
}

const InquiryForm: React.FC<InquiryFormProps> = ({ images }) => {
  const accessToken = localStorage.getItem('accessToken');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    images: [],
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataWithImages = new FormData();
    formDataWithImages.append('title', formData.title);
    formDataWithImages.append('category', formData.category);
    formDataWithImages.append('content', formData.content);

    images.forEach((image) => {
      formDataWithImages.append('images', image);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}${INQUIRY_API_URL.INQUIRY_CREATE}`,
        formDataWithImages,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.code === 'SU') {
        navigate(`${PAGE_URL.HELP}`);
      } else {
        console.error('문의 등록 실패:', response.data);
      }
    } catch (error) {
      console.error('문의 등록 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-3">
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium mb-1">문의 제목</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="ex. 보증금이 제대로 환급되지 않았어요."
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mb-4 w-full ">
        <label className="block text-sm font-medium mb-1">문의 카테고리</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">카테고리 선택</option>
          <option value="DEAL">거래</option>
          <option value="AUCTION">경매</option>
          <option value="ETC">기타</option>
        </select>
      </div>

      <div className="mb-4 w-full ">
        <label className="block text-sm font-medium mb-1">문의 내용</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="문제 상황을 자세히 작성해 주시면 더욱 빠르게 도움을 드릴 수 있습니다."
          className="w-full border border-gray-300 rounded p-2 min-m-[300px] h-[300px]"
        />
      </div>

      <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white rounded-md">
        문의 등록하기
      </button>
    </div>
  );
};

export default InquiryForm;
