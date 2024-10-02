import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트

interface AuctionFormProps {
  images: File[]; // AuctionImage에서 가져온 이미지
}

const AuctionForm: React.FC<AuctionFormProps> = ({ images }) => {
  const [title, setTitle] = useState('');
  const [initValue, setStartingPrice] = useState('');
  const [duration, setDuration] = useState('3');
  const [detail, setDescription] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('initValue', initValue);
    formData.append('duration', duration);
    formData.append('detail', detail);

    // 이미지 추가
    images.forEach((image) => {
      formData.append('images', image);
    });

    const accessToken = `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImE1MDVhZHNhc2Q1c3NhZnkwMkBzc2FmeS5jb20iLCJpYXQiOjE3Mjc2Nzc4MTMsImV4cCI6MTcyNzY4ODYxM30.OJQa9vtghSX7Bg9ji0Y_EFT2RMrb5gNDEP_Rg-zgZHw`; //localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기

    try {
      const response = await fetch('http://localhost:4040/api/auctions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        // 성공 시 처리
        alert('경매가 성공적으로 등록되었습니다.'); // 알림 표시
        navigate('/auction'); // 페이지 이동
      } else {
        // 오류 처리
        const errorData = await response.json();
        console.error('경매 등록 실패:', errorData);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">경매 시작하기</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">시작가</label>
          <input
            type="number"
            value={initValue}
            onChange={(e) => setStartingPrice(e.target.value)}
            placeholder="시작가"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">기간</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="3">3일</option>
            <option value="5">5일</option>
            <option value="7">7일</option>
            {/* 다른 기간 추가 가능 */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">설명</label>
          <textarea
            value={detail}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="경매 물품에 대한 설명이 상세할수록 구매자의 이목을 끌 수 있습니다."
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          경매 시작하기
        </button>
      </form>
    </div>
  );
};

export default AuctionForm;
