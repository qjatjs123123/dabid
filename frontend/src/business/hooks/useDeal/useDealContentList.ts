import { getDealContentListQuery } from "../../../stores/queries/getDealContentListQuery";

export default function useDealContentList() {
    const dealContentListQuery = getDealContentListQuery();

    return dealContentListQuery;
}