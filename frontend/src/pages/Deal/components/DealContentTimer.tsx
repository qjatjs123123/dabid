import useDealTime from '../../../business/hooks/useDeal/useDealTime';

const DealContentTimer = () => {
  const { remainingTime } = useDealTime();

  const displayRemainingTime = remainingTime || '0일 0시간 0분 0초 남음';

  return <div className="mb-[4px] text-[16px] text-[#868e96] font-[400]">{displayRemainingTime}</div>;
};

export default DealContentTimer;
