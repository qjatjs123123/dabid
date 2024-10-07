import React from 'react';

interface SearchButtonProps {
  clickFunc: () => void; //
  value: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ clickFunc, value }) => {
  return (
    <div className="p-2 pl-3 pr-3 bg-[#d9d9d9] rounded-lg cursor-pointer hover:bg-[#b3b3b3]" onClick={clickFunc}>
      {value}
    </div>
  );
};

export default SearchButton;
