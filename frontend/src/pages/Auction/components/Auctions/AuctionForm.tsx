import React, { useState } from 'react';

const AuctionForm: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [duration, setDuration] = useState('3');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에서 폼 데이터를 처리하는 로직 추가
    console.log({
      title,
      startingPrice,
      duration,
      description,
      selectedImages,
    });
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
            value={startingPrice}
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
            value={description}
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
