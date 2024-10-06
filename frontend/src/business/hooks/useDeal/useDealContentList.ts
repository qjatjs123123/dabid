import { useRecoilValue } from "recoil";
import { getDealContentListQuery } from "../../../stores/queries/getDealContentListQuery";
import { curDealIdState } from "../../../stores/recoilStores/Deal/stateDealId";

export default function useDealContentList() {
    const curDealId = useRecoilValue(curDealIdState);
    
    const dealContentListQuery = getDealContentListQuery();


    return dealContentListQuery;
}