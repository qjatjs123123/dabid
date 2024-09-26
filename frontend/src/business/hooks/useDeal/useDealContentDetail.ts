import { useRecoilValue } from 'recoil';
import { curDealIdState } from '../../../stores/recoilStores/Deal/stateDealId';
import { getDealContentDetailQuery } from '../../../stores/queries/getDealContentDetailQuery';

const useDealContentDetail = () => {
    const curDealId = useRecoilValue(curDealIdState);
    const dealContentDetail = getDealContentDetailQuery(curDealId);

    return dealContentDetail;
};

export default useDealContentDetail;
