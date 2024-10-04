import React, { useState } from 'react';
import axios from 'axios'; // axios 사용
import bankIcon from '../../../assets/floating/bankIcon.svg';
import { useNavigate } from 'react-router-dom';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  // transferAmount: number;
  // accountNumber: string;
  deal: any; // deal 정보 추가
}

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, deal }) => {
  const [error, setError] = useState<string | null>(null); // 오류 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  if (!isOpen) return null;

  // 송금 API 호출 함수
  const handleTransfer = async () => {
    try {
      const response = await axios.post(`/api/transfer/${deal.id}`); // dealId로 API 호출
      if (response.status === 200) {
        // 송금 성공 시 DealContentDetail로 이동
        navigate(`/deal/${deal.id}`);
      }
    } catch (error) {
      // 에러 발생 시 에러 메시지 설정
      setError('송금에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold">
          &times;
        </button>

        <div className="flex justify-center mb-4">
          <img src={bankIcon} alt="bank-icon" />
        </div>
        <div className="text-center text-xl font-bold mb-4">다비드은행</div>

        <div className="text-center text-2xl font-bold mb-2">이체</div>
        <div className="text-center text-xl font-bold mb-4">{deal.winning_bid} 원</div>

        <div className="mb-4">
          <label className="block text-left font-bold mb-2">이체금액</label>
          <div className="relative">
            <input
              type="text"
              // value={transferAmount.toLocaleString()}
              value={deal.winning_bid}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-center text-xl"
              readOnly
            />
            <span className="absolute right-3 top-3 text-gray-500 text-lg">원</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-left font-bold mb-2">입금계좌번호</label>
          <input
            type="text"
            value={deal.account}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-center text-lg"
            readOnly
          />
        </div>

        {/* 송금 버튼 */}
        <button
          className="w-full bg-blue-600 border border-black flex items-center justify-center py-2 rounded-lg font-bold text-white text-lg hover:bg-blue-500"
          onClick={handleTransfer} // 송금 함수 호출
        >
          <img src={'https://img.icons8.com/ios-filled/20/ffffff/won.png'} alt="won-icon" className="mr-2" />
          송금
        </button>

        {/* 에러 메시지 */}
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default TransferModal;
