import { useRecoilValue } from 'recoil';
import { getDealSellerAccountQuery } from '../../../stores/queries/getDealSellerAccountQuery';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';

const DealAccount = () => {
  const curDealId = useRecoilValue(curDealIdState);
  const { data, refetch, isStale } = getDealSellerAccountQuery(curDealId);

  const handleRefresh = () => {
    if (isStale) {
      refetch();
    }
  };

  return (
    <div>
      <div className="font-[800] text-[20px] mb-[10px] mt-[40px]">거래 계좌 조회</div>
      <div className="w-full relative flex flex-row">
        <input
          readOnly
          className="flex-3 cursor-pointer border border-black-500 rounded-[50px] w-full p-2 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#F3A967] focus:border-white"
        />
        <div className="absolute top-1/2 left-5 transform -translate-y-1/2 flex items-center justify-center text-center font-bold text-2xl leading-7">
          {data ? data.REC.accountNo : ''}
        </div>
        <div className="absolute top-1/2 right-[60px] transform -translate-y-1/2 flex items-center justify-center text-center text-2xl leading-7">
          {data ? data.REC.accountBalance : ''} 원
        </div>
        <div className="flex items-center justify-center ml-[30px] text-2xl cursor-pointer" onClick={handleRefresh}>
          <i className="fa fa-refresh"></i>
        </div>
      </div>
    </div>
  );
};

export default DealAccount;
