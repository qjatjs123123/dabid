import React from 'react';
import { DELIVERY_STAGE, MESSAGE } from '../../../util/Constants';
import { Track } from './DeliveryStatusSearch';
import { isModalState } from '../../../stores/recoilStores/Deal/stateModal';
import { useSetRecoilState } from 'recoil';
import DealContentUserProfile from './DealContentUserProfile';

interface DeliveryStatusModalProps {
  edges: Track | null;
}

interface HeaderProps {
  closeModal: () => void;
}
interface ProgressStageProps {
  lastData: string | null;
}
const DeliveryStatusModal: React.FC<DeliveryStatusModalProps> = ({ edges }) => {
  const data = edges ? edges.events.edges : [];
  const lastData = edges ? edges.lastEvent.status.name : null;
  const setIsModalOpen = useSetRecoilState(isModalState);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderExistOrNot = () => {
    if (!lastData) return <NoContents />;

    return (
      <>
        {/* 배송완료 상태 및 진행 상태 바 */}
        <ProgressStage lastData={lastData} />

        {/* 시간, 현재위치, 배송상태 */}
        <DeliveryHistory data={data} />

        {/* 판매자 정보 */}
        <div className="mb-4">
          <p className="font-bold">김** 님</p>
          <p className="text-gray-500">경기 안양시 만안구</p>
        </div>
      </>
    );
  };

  return (
    <div className="fixed max-x-[540px]  inset-0 flex items-center justify-center z-50">
      <div onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-50" />
      <div
        className="relative max-x-[540px]  z-50 w-[540px] bg-white p-6 rounded-lg shadow-lg z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 택배 조회 Header */}
        <Header closeModal={closeModal} />
        {renderExistOrNot()}

        {/* 확인 버튼 */}
        <button onClick={closeModal} className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          확인
        </button>
      </div>
    </div>
  );
};

const NoContents = () => {
  return (
    <div>
      <div className="font-[800] text-[20px] text-center mb-[10px]">{MESSAGE.FIND_NO_CONTENTS}</div>
      <div className="text-center mb-[30px]">{MESSAGE.DELIVERY_NO_CONTENTS}</div>
    </div>
  );
};

const DeliveryHistory: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="mb-4">
      <table className="w-full table-auto text-left border-collapse">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2">시간</th>
            <th>현재위치</th>
            <th>배송상태</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eventEdge, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{new Date(eventEdge.node.time).toLocaleString()}</td>
              <td>{eventEdge.node.description.split(' - ')[1]}</td>
              <td>{eventEdge.node.status.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProgressStage: React.FC<ProgressStageProps> = ({ lastData }) => {
  const renderCurrentStage = () => {
    if (!lastData) return '미등록';

    if (lastData === '잡하') return '이동중';
    else if (lastData === '캠프도착') return '배송지';
    else if (lastData === '배송출발') return '배송중';
    else if (lastData === '배송완료') return '배송완료';
  };

  const renderDeliveryStage = () => {
    let flg = false;
    let flg1 = false;

    return DELIVERY_STAGE.map((stage, index) => {
      const bgColor = flg ? 'bg-white' : 'bg-green-500';
      if (stage.name === lastData) {
        flg = true;
        flg1 = true;
      }
      const barColor = flg1 ? 'bg-white' : 'bg-green-500';

      return (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center flex-grow">
            <div className={`${bgColor} p-1 rounded-full text-white`}>{stage.icon}</div>
            <p className="mt-2 text-sm whitespace-nowrap">{stage.label}</p>
          </div>
          {index < DELIVERY_STAGE.length - 1 && <div className={`w-full h-1 ${barColor} mx-2`}></div>}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="bg-[#1D3557] p-4 rounded-lg text-white mb-4">
      <h3 className="text-center text-lg font-bold mb-4">{renderCurrentStage()}</h3>
      <div className="flex justify-between items-center">{renderDeliveryStage()}</div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ closeModal }) => {
  return (
    <div className="flex justify-between items-center border-b pb-2 mb-4">
      <h2 className="text-lg font-bold">택배 조회</h2>
      <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
        ✖
      </button>
    </div>
  );
};

export default DeliveryStatusModal;
