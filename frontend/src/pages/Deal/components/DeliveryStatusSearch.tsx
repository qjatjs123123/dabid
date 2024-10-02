import DropDown from '../../../components/DropDown/DropDown';
import { DELIVERY } from '../../../util/Constants';
import useDeliveryTracker from '../../../business/hooks/useDeal/useDeliveryTracker';
import SearchButton from '../../../components/Button/SearchButon';
import { useQuery } from '@tanstack/react-query';
import { getTrackingInfo } from '../../../api/DeliveryTrackerAPI';
import { getDeliveryIdByName } from '../../../util/DeliveryCodeToName';
import DeliveryStatusModal from './DeliveryStatusModal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isModalState } from '../../../stores/recoilStores/Deal/stateModal';
import { useEffect } from 'react';

export interface DeliveryStatus {
  code: string; // 상태 코드 (예: "DELIVERED", "IN_TRANSIT", "OUT_FOR_DELIVERY")
  name: string; // 상태 이름 (예: "배송완료", "집하", "배송출발")
}

export interface EventNode {
  time: string; // 이벤트 발생 시간
  status: DeliveryStatus; // 이벤트 상태
  description: string; // 이벤트 설명
}

export interface EventEdge {
  node: EventNode; // EventNode 객체
}

export interface Events {
  edges: EventEdge[]; // EventNode 배열
}

export interface LastEvent {
  time: string; // 마지막 이벤트 시간
  status: DeliveryStatus; // 마지막 이벤트 상태
  description: string; // 마지막 이벤트 설명
}

export interface Track {
  lastEvent: LastEvent; // 마지막 이벤트
  events: Events; // 이벤트 목록
}

export interface DeliveryResponse {
  data: {
    track: Track; // 트래킹 정보
  };
}

const DeliveryStatusSearch = () => {
  const { isOpen, deliveryCode, deliveryNumber, handleDropBoxOpen, handleDeliveryCodeSet, handleInputChange } =
    useDeliveryTracker();

  const isModalOpen = useRecoilValue(isModalState);
  const setIsModalOpen = useSetRecoilState(isModalState);

  const { data: info, refetch } = useQuery<DeliveryResponse, Error>({
    queryKey: [`trackerInfo_${deliveryNumber}`], // queryKey
    queryFn: () => getTrackingInfo(getDeliveryIdByName(deliveryCode), deliveryNumber), // queryFn
    enabled: false, // options
  });

  const handleDeliverySearch = async () => {
    refetch();
    setIsModalOpen(true);
  };

  useEffect(() => {}, [info]);

  return (
    <div>
      <div className="font-[800] text-[20px] mb-[10px]">배송 조회</div>
      <div className="flex gap-[20px]">
        <div className="flex-2">
          <DropDown
            content={DELIVERY}
            isOpen={isOpen}
            setContent={handleDeliveryCodeSet}
            handleDropBoxOpen={handleDropBoxOpen}
            value={deliveryCode}
            placeholder={'운송사를 선택해주세요'}
          />
        </div>
        <input
          className="flex-3 cursor-pointer border border-black-500 rounded-lg w-full p-2 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#F3A967] focus:border-white"
          placeholder="운송장 번호를 입력하세요."
          value={deliveryNumber}
          onChange={handleInputChange}
        />
        <SearchButton clickFunc={handleDeliverySearch} />
      </div>
      {isModalOpen && info && <DeliveryStatusModal edges={info.data.track} />}
    </div>
  );
};

export default DeliveryStatusSearch;
