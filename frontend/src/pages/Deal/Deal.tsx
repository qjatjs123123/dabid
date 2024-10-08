import Chat from '../../components/Chat/Chat';
import DealContentContainer from './components/DealContentContainer';
import DealContentDetail from './components/DealContentDetail';

const Deal = () => {
  return (
    <>
      <div className="w-full lg:h-[45vh] sm:h-auto bg-[#D3EDFA] px-[15%] flex flex-col lg:flex-row justify-center items-center">
        <div className="flex flex-col mb-8 lg:mb-0 lg:mr-[100px] text-center lg:text-left">
          <div className="text-3xl lg:text-4xl font-bold mb-[15px]">안전한 거래</div>
          <div className="text-3xl lg:text-4xl font-bold mb-[15px]">에스크로 결제</div>
          <div className="text-[16px] lg:text-[20px] font-normal mb-[10px]">안전하고 행복한 거래를</div>
          <div className="text-[16px] lg:text-[20px]">지금 경험해보세요.</div>
        </div>
        <img src="/deal.png" className="h-[25vh] lg:h-[30vh] w-auto"></img>
      </div>

      <div className="w-full flex justify-center items-center text-4xl font-bold p-[40px]">
        <h1>내 거래</h1>
      </div>

      <div className="container flex flex-row">
        <div className="flex-1 border-r">
          <DealContentContainer />
        </div>
        <div className="flex-2">
          <DealContentDetail />
        </div>
        <div>
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Deal;
