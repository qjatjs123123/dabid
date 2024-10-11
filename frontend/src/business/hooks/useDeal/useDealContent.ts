// hooks/useDealContent.ts
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';

const useDealContent = (dealId: number) => {
  const setCurDealId = useSetRecoilState(curDealIdState);
  const curDealId = useRecoilValue(curDealIdState);

  const handleClick = () => {
    setCurDealId(dealId);
  };

  const isActive = curDealId === dealId;

  const boxShadowClasses = isActive 
    ? 'shadow-[0px_4px_16px_0_rgba(242,170,103,1.0)]' 
    : 'shadow-[0px_4px_16px_rgba(0,0,0,.04)]';

  const borderColorClasses = isActive 
    ? 'border-[rgba(242,170,103,1.0)] border-2' 
    : 'border-[rgba(0,0,0,0.1)] border-2';

  const transitionClasses = 'duration-100';

  return { handleClick, boxShadowClasses, borderColorClasses, transitionClasses };
};

export default useDealContent;
