import React from 'react';

interface SearchButtonProps {
  clickFunc: () => void; //
}

const SearchButton: React.FC<SearchButtonProps> = ({ clickFunc }) => {
  return (
    <div
      className="p-2 pl-3 pr-3 bg-[#d9d9d9] rounded-lg cursor-pointer hover:bg-[#b3b3b3]"
      onClick={clickFunc} // 클릭 이벤트 핸들러를 추가합니다.
    >
      조회
    </div>
  );
};

export default SearchButton;
