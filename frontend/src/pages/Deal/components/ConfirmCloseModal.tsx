import React, { useState } from 'react';
import axios from 'axios';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';
import { useRecoilValue } from 'recoil';
import { getDealContentDetailQuery } from '../../../stores/queries/getDealContentDetailQuery';

interface ConfirmCloseModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: number; // deal id를 전달받음
}

const ConfirmCloseModal: React.FC<ConfirmCloseModalProps> = ({ isOpen, onClose, dealId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리
  const curDealId = useRecoilValue(curDealIdState);
  const { data: dealContentDetail, refetch } = getDealContentDetailQuery(curDealId);

  const handleConfirmClose = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`https://j11a505.p.ssafy.io/api/deal/close/${dealId}`);
      if (response.status === 200) {
        console.log('인수 확인 완료');
        setLoading(false);
        onClose(); // 모달 닫기
        refetch();
      } else {
        setError('인수 확인에 실패했습니다.');
        setLoading(false);
      }
    } catch (error) {
      setError('인수 확인 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold">
          &times;
        </button>
        <div className="text-center text-xl font-bold mb-4">인수 확인</div>
        <div className="text-center text-lg mb-4">정말로 인수하시겠습니까?</div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <div className="flex justify-end">
          <button className="bg-gray-300 text-black px-4 py-2 mr-2 rounded" onClick={onClose} disabled={loading}>
            취소
          </button>
          <button
            className={`bg-[#FFA45D] text-white px-4 py-2 rounded ${loading ? 'opacity-50' : ' hover:bg-[#FF872A]'}`}
            onClick={handleConfirmClose}
            disabled={loading}
          >
            {loading ? '처리 중...' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCloseModal;
