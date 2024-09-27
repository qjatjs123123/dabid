import { useRecoilValue } from 'recoil';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';
import { getDealContentDetailQuery } from '../../../stores/queries/getDealContentDetailQuery';
import { useEffect, useState } from 'react';

// const useDealContentDetail = () => {
//     const curDealId = useRecoilValue(curDealIdState);
//     const dealContentDetail = getDealContentDetailQuery(curDealId);
    
//     return dealContentDetail;
// };
const useDealContentDetail = () => {
    const curDealId = useRecoilValue(curDealIdState);
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        setShowSkeleton(true); 
    }, [curDealId]); 


    const dealContentDetail = getDealContentDetailQuery(curDealId).data;
    return {
        dealContentDetail,
        showSkeleton,
        setShowSkeleton
    }
};
export default useDealContentDetail;
