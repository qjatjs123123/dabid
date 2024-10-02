import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CancelAuctionModal from '../../Modal/CancelAuctionModal';
import { PAGE_URL } from '../../../../../util/Constants';

interface BiddingStatusProps {
  auctionId: number;
  isOwner: boolean;
  isParticipant: boolean;
  isFirstMember: boolean;
}

const BiddingStatus: React.FC<BiddingStatusProps> = ({ auctionId, isOwner, isParticipant, isFirstMember }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://j11a505.p.ssafy.io/api/auctions/${auctionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('경매가 성공적으로 취소되었습니다.');
        navigate(PAGE_URL.AUCTION_LIST);
      } else {
        alert('경매 취소에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      closeModal();
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <input type="hidden" value={auctionId} />
      {isOwner ? (
        <button onClick={openModal} className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
          경매 취소
        </button>
      ) : isParticipant && !isFirstMember ? (
        <div className="flex justify-around w-full">
          <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition">입찰하기</button>
          <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition ml-2">입찰포기</button>
        </div>
      ) : isParticipant && isFirstMember ? (
        <label className="text-red-600 mb-2">귀하는 현재 유력 낙찰자입니다!</label>
      ) : (
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">경매 참여</button>
      )}
      <CancelAuctionModal auctionId={auctionId} isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirm} />
    </div>
  );
};

export default BiddingStatus;
