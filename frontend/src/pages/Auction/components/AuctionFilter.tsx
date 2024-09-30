const AuctionFilter = () => {
  return (
    <div className="filter-container w-1/6 p-4 fixed h-auto border border-gray-300 bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">검색 필터</h2>
      <input type="text" placeholder="검색어 입력" className="w-full mb-2 p-2 border border-gray-300 rounded" />
      <h3 className="text-md font-semibold mb-2">카테고리</h3>
      <label className="block mb-2">
        <input type="checkbox" /> 전자제품
      </label>
      <label className="block mb-2">
        <input type="checkbox" /> 가전제품
      </label>
      <label className="block mb-2">
        <input type="checkbox" /> 생활제품
      </label>
      <h3 className="text-md font-semibold mb-2">입찰가 범위 설정</h3>
      <input type="number" placeholder="최소 입찰가" className="w-full mb-2 p-2 border border-gray-300 rounded" />
      <input type="number" placeholder="최대 입찰가" className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <button className="w-full p-2 bg-blue-500 text-white rounded">검색</button>
    </div>
  );
};

export default AuctionFilter;
