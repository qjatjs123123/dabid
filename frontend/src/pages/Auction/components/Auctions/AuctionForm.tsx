import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import RegistSuccessModal from '../Modal/RegistSuccessModal'; // 성공 모달 컴포넌트 임포트
import AuctionErrorModal from '../Modal/AuctionErrorModal'; // 에러 모달 컴포넌트 임포트

interface AuctionFormProps {
  images: File[]; // AuctionImage에서 가져온 이미지
}

const AuctionForm: React.FC<AuctionFormProps> = ({ images }) => {
  const [title, setTitle] = useState('');
  const [initValue, setStartingPrice] = useState('');
  const [duration, setDuration] = useState('3');
  const [detail, setDescription] = useState('');
  const [isRegistSuccessOpen, setRegistSuccessOpen] = useState(false); // 성공 모달 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 메시지 상태
  const [isErrorModalOpen, setErrorModalOpen] = useState<boolean>(false); // 에러 모달 상태
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

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/auctions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        // 성공 시 모달 열기
        setRegistSuccessOpen(true);
      } else {
        // 오류 처리
        const errorData = await response.json();
        setErrorMessage(errorData.message || '경매 등록에 실패했습니다.'); // 에러 메시지 설정
        setErrorModalOpen(true); // 에러 모달 열기
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      setErrorMessage('API 요청 중 오류가 발생했습니다.'); // 기본 에러 메시지 설정
      setErrorModalOpen(true); // 에러 모달 열기
    }
  };

  const handleRegistSuccessClose = () => {
    setRegistSuccessOpen(false);
    navigate('/auction'); // 페이지 이동
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false); // 에러 모달 닫기
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

      {/* 성공 모달 컴포넌트 추가 */}
      <RegistSuccessModal isRegistSuccessOpen={isRegistSuccessOpen} onRegistSuccessClose={handleRegistSuccessClose} />

      {/* 에러 모달 컴포넌트 추가 */}
      <AuctionErrorModal isOpen={isErrorModalOpen} message={errorMessage} onClose={handleCloseErrorModal} />
    </div>
  );
};

export default AuctionForm;
