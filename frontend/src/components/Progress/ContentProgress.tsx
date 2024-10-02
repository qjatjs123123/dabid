import React from 'react';

interface dataProps {
  data: data[];
}
type data = {
  id: string;
  name: string;
};
const ContentProgress: React.FC<dataProps> = ({ data }) => {
  let flg = false;
  let flg1 = false;
  return (
    <div className="flex justify-between items-center w-full">
      {data.map(({ id, name }, idx) => {
        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <div className="bg-[#ff9f05] w-[25px] h-[25px] rounded-full"></div>
              <div className="text-[12px]">{name}</div>
            </div>
            {idx < data.length - 1 && (
              <div key={`line-${idx}`} className="flex-grow h-[1px] bg-[#ff9f05] mx-2 mb-[15px]"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ContentProgress;
