import { useState } from 'react';
import useDealContentDetail from '../../../business/hooks/useDeal/useDealContentDetail';
import { formatNumberWithCommas } from '../../../util/moneyComma';
import DealContentUserProfile from './DealContentUserProfile';
import DealContentDetailSkeleton from '../skeletons/DealContentDetailSkeleton';
import DealButton from '../../../components/Button/DealButton';
import CloseButton from '../../../components/Button/CloseButton';
import ConfirmCloseModal from './ConfirmCloseModal'; // ConfirmCloseModal 임포트
import DeliveryStatusSearch from './DeliveryStatusSearch';
import DealStatus from './DealStatus';
import DealAccount from './DealAccount';
import TransferModal from './TransferModal';
import DealContentTimer from './DealContentTimer';

const DealContentDetail = () => {
  const { dealContentDetail: deal, showSkeleton } = useDealContentDetail();
  const [isModalOpen, setIsModalOpen] = useState(false); // 송금 모달 상태
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 인수 확인 모달 상태

  if (showSkeleton || !deal) {
    return <DealContentDetailSkeleton />; // 스켈레톤 UI를 보여줌
  }

  const openTransferModal = () => setIsModalOpen(true); // 송금 모달 열기
  const closeTransferModal = () => setIsModalOpen(false); // 송금 모달 닫기

  const openConfirmModal = () => setIsConfirmModalOpen(true); // 인수 확인 모달 열기
  const closeConfirmModal = () => setIsConfirmModalOpen(false); // 인수 확인 모달 닫기

  // 상태에 따른 버튼 렌더링
  const renderButton = () => {
    if (deal.status === 'TRANSACTION_DONE') {
      return (
        <button
          className="w-full mt-4 mb-4 text-lg font-semibold text-white rounded-lg bg-orange-300 transition-all duration-200 py-3"
          disabled
        >
          거래 종료
        </button>
      ); // 거래 종료 상태일 때 버튼 비활성화
    } else if (deal.status === 'PAYMENT_COMPLETE' || deal.status === 'IN_TRANSIT' || deal.status === 'DELIVERED') {
      return <CloseButton onClick={openConfirmModal} />; // 인수 확인 모달 열기
    } else {
      return <DealButton onClick={openTransferModal} />; // 송금 모달 열기
    }
  };

  return (
    <div className="flex-3 max-h-[calc(100vh-150px)] overflow-y-auto w-full scroll-hide scroll-hide">
      <div className="w-full h-[80px] flex justify-end">
        <div className="relative">
          <i className="fa fa-ban text-[25px] cursor-pointer mt-[30px] mr-[30px]"></i>
          <p className="arrow_box1 ">신고</p>
        </div>
      </div>
      <div className="h-[calc(100%-80px)] px-[90px]">
        <div>
          <img
            className=" h-[400px] w-full object-cover rounded-lg mb-[25px]"
            referrerPolicy="no-referrer"
            src={`${deal.image}`}
            alt="Deal Image"
          />
          <div className="flex justify-start">
            <div className="flex-2 flex item-center">
              <DealContentUserProfile />
            </div>
            <div className="flex-1 flex justify-end">
              <div className="w-[180px]">{!deal.seller ? renderButton() : <></>}</div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#e9ecef] mt-[25px] mb-[25px]"></div>
          <div className="text-[30px] font-[600] mb-[4px] leading-tight ">{deal.title}</div>
          <DealContentTimer dealQuery={deal} fontSize="16px" />
          {/* <div className="mb-[4px] text-[16px] text-[#868e96] font-[400]">12시간 06분 전</div> */}
          <div className="mb-[25px]">
            <span className="font-[800] text-[19px]">{formatNumberWithCommas(deal.winning_bid)} 원</span>
          </div>
          <div className="mb-[8px] text-[17px] leading-tight">{deal.detail}</div>
          <div className="h-[1px] w-full bg-[#e9ecef] mt-[35px] mb-[35px]"></div>

          <DeliveryStatusSearch IsSeller={deal.seller} />
          {deal.seller ? <DealAccount /> : <></>}

          <div className="h-[1px] w-full bg-[#e9ecef] mt-[45px] mb-[45px]"></div>
          <DealStatus />
          <div className="mb-[100px]"></div>
        </div>
      </div>

      {/* 송금 모달 */}
      <TransferModal isOpen={isModalOpen} onClose={closeTransferModal} deal={deal} />

      {/* 인수 확인 모달 */}
      <ConfirmCloseModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        dealId={deal.id} // 인수 확인 API 호출 함수
      />
    </div>
  );
};

export default DealContentDetail;
