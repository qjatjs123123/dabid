import { useState, useRef, useEffect } from "react";
import { getDeliveryNameById } from '../../../util/DeliveryCodeToName';
import { getDealContentDetailQuery } from "../../../stores/queries/getDealContentDetailQuery";
import { useRecoilValue } from "recoil";
import { curDealIdState } from "../../../stores/recoilStores/Deal/stateDealId";
import usePostCourierInfo from "./usePostCourierInfo";


const useDeliveryTracker = () => {
    const curDealId = useRecoilValue(curDealIdState);
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryCode, setDeliveryCode] = useState("");
    const [deliveryNumber, setDeliveryNumber] = useState("");
    const [isEnrollState, setIsEnrollState] = useState(true);
    const dealQuery = getDealContentDetailQuery(curDealId);

    useEffect(() => {
        if (!dealQuery.data) return;
    
        setIsEnrollState(!dealQuery.data.carrierId);
        setDeliveryNumber(dealQuery.data.trackingNumber || "");
        setDeliveryCode(getDeliveryNameById((dealQuery.data.carrierId || "").toLowerCase().replace(/_/g, '.')));
    }, [dealQuery.data]);

    const code = useRef("");

    const handleDeliveryCodeSet = (param: string) => {
        setDeliveryCode(getDeliveryNameById(param));
        code.current = param; 
        setIsOpen(false); 
    };

    const handleDropBoxOpen = (isParam: boolean) => {
        setIsOpen(isParam); 
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryNumber(event.target.value); 
    };
    
    const { mutate: postCourierInfo } = usePostCourierInfo(curDealId, deliveryNumber, code.current);

    return {
        isOpen,
        deliveryCode,
        setDeliveryCode,
        handleDropBoxOpen,
        handleDeliveryCodeSet,
        handleInputChange,
        postCourierInfo,
        deliveryNumber,
        isEnrollState,
    };
}

export default useDeliveryTracker;
