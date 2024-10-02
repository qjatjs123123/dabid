import { useState, useRef } from "react";
import { getDeliveryNameById } from '../../../util/DeliveryCodeToName'

const useDeliveryTracker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryCode, setDeliveryCode] = useState("");
    const [deliveryNumber, setDeliveryNumber] = useState("");
    const code = useRef("");

    const handleDeliveryCodeSet = (param : string) => {
        setDeliveryCode(getDeliveryNameById(param));
        code.current = param;
        setIsOpen(false);
    }

    const handleDropBoxOpen = (isParam : boolean) => {
        setIsOpen(isParam);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryNumber(event.target.value); // 상태 업데이트
    };
    


    return {
        isOpen,
        deliveryCode,
        setDeliveryCode,
        handleDropBoxOpen,
        handleDeliveryCodeSet,
        handleInputChange,
        deliveryNumber
      }
}

export default useDeliveryTracker;