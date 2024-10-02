// import useAuctionDetail from '../../../business/hooks/useDeal/useDealContentDetail';
import AuctionDeatilImageSkeleton from '../skeletons/AuctionDetailImageSkeleton';

const AuctionDetailImage = () => {
  // const { auctionDetailImage: auctionDetail, showSkeleton, setShowSkeleton } = useAuctionDetail();

  // if (showSkeleton || !auctionDetail) {
  if (true) {
    return <AuctionDeatilImageSkeleton />;
  }

  return (
    <div className="flex-3 h-full px-[200px]">
      <div>
        <img
          className=" h-[400px] w-full object-cover rounded-lg mb-4"
          referrerPolicy="no-referrer"
          // src={`${deal.image}`}
          alt="Deal Image"
        />
        {/* <DealContentUserProfile /> */}
        <div className="text-[20px] mt-4 mb-[8px] font-blackoverflow-hidden text-ellipsis line-clamp-1">
          {/* {deal.title} */}
          deal.title
        </div>
        {/* <div className="mb-[4px] h-[48px] overflow-hidden text-ellipsis line-clamp-2">{deal.detail}</div> */}
        <div className="mb-[4px] h-[48px] overflow-hidden text-ellipsis line-clamp-2">deal.detail</div>
        <div className="mb-[5px]">
          {/* <span className="text-[20px]  font-black mr-[3px]">{formatNumberWithCommas(deal.winning_bid)}</span> */}
          <span className="text-[20px]  font-black mr-[3px]">formatNumberWithCommas(deal.winning_bid)</span>
          <span>원</span>
        </div>
        {/* 기타 필요한 데이터들 추가 */}
      </div>
    </div>
  );
};

export default AuctionDetailImage;
