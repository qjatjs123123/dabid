import React from 'react';
import { useRecoilValue } from 'recoil';
import { dealStatusState } from '../../stores/recoilStores/Deal/stateDealStatus';

interface dataProps {
  data: data[];
}
type data = {
  id: string;
  name: string;
};
const ContentProgress: React.FC<dataProps> = ({ data }) => {
  const dealStatus = useRecoilValue(dealStatusState);
  let flg = false;
  let flg1 = false;
  let flg2 = false;
  return (
    <div className="flex justify-between items-center w-full">
      {data.map(({ id, name }, idx) => {
        const bgColor = flg ? 'bg-white' : 'bg-[#ff9f05]';
        const border = flg2 ? 'border-[#dcdadb]' : 'border-[#ff9f05]';
        if (id === dealStatus) {
          flg = true;
          flg1 = true;
          flg2 = true;
        }
        const barColor = flg1 ? 'bg-[#dcdadb]' : 'bg-[#ff9f05]';
        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <div
                className={`${bgColor} text-[12px] w-[25px] h-[25px] border border-[#dcdadb] rounded-full flex justify-center items-center ${border} text-white`}
              >
                {bgColor === 'bg-[#ff9f05]' && <i className="fa fa-check"></i>}
              </div>
              <div className="text-[12px]">{name}</div>
            </div>
            {idx < data.length - 1 && (
              <div key={`line-${idx}`} className={`flex-grow  h-[1px] ${barColor} mx-2 mb-[15px]`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ContentProgress;
