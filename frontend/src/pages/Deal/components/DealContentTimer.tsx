import React from 'react';
import useDealTime from '../../../business/hooks/useDeal/useDealTime';
import { getDealStageNameById } from '../../../util/DeliveryCodeToName';

interface DealContentTimerProps {
  dealQuery: any;
  fontSize: string;
}

const DealContentTimer: React.FC<DealContentTimerProps> = ({ dealQuery, fontSize }) => {
  if (!dealQuery) return null;

  const { remainingTime, timerVisible, status }: any = useDealTime(dealQuery);
  const dealStage = getDealStageNameById(status); // 타입을 저장하는 변수

  // 남은 시간이 없을 경우 기본 값을 설정
  const displayRemainingTime = remainingTime || '0일 0시간 0분 0초 남음';

  return (
    <div className={`mb-[4px] text-[#868e96] font-[400]`} style={{ fontSize }}>
      <div
        className={`rounded-3xl mt-1 px-4 py-1 inline-block cursor-pointer ${
          timerVisible ? 'text-gray-500' : `bg-[${dealStage?.color}] text-white`
        }`}
        style={{
          backgroundColor: timerVisible ? 'transparent' : dealStage ? dealStage.color : 'gray', // 기본 색상으로 회색 설정
        }}
      >
        {timerVisible ? displayRemainingTime : dealStage?.name || '단계 없음'}
      </div>
    </div>
  );
};

export default DealContentTimer;
