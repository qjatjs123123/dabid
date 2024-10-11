const DealContentDetailSkeleton = () => {
  return (
    <div className="flex-3 max-h-[calc(100vh-150px)]  px-[90px] scroll-hide overflow-y-auto">
      <div className="w-full h-[80px]"></div>
      <div className="h-[400px] w-full rounded-lg mb-[25px] bg-gray-200 animate-pulse"></div>
      <div className="h-[50px] w-full rounded-lg mb-[25px] bg-gray-200 animate-pulse"></div>
    </div>
  );
};

export default DealContentDetailSkeleton;
