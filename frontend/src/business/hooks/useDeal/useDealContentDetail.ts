import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';
import { getDealContentDetailQuery } from '../../../stores/queries/getDealContentDetailQuery';
import { useEffect, useState } from 'react';
import { SKELETON_TIME } from '../../../util/Constants';
import { dealStatusState } from '../../../stores/recoilStores/Deal/stateDealStatus';

const useDealContentDetail = () => {
    const curDealId = useRecoilValue(curDealIdState);

    const dealQuery = getDealContentDetailQuery(curDealId);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const setDealStatus = useSetRecoilState<string | undefined>(dealStatusState);

    useEffect(() => {
        setDealStatus(dealQuery.data?.status);
    }, [dealQuery.data])

    useEffect(() => {
         setShowSkeleton(true); 
        if (!dealQuery.data) {
            const timer = setTimeout(() => {
                setShowSkeleton(false); 
            }, SKELETON_TIME.TIME); 

            return () => clearTimeout(timer);
        } else {
            setShowSkeleton(false);
        }
    }, [curDealId]); 

    return {
        dealContentDetail: dealQuery.data,
        showSkeleton,
    };
};

export default useDealContentDetail;
