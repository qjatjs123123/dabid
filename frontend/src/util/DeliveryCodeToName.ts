import { DELIVERY } from './Constants'

export const getDeliveryNameById = (id: string) => {
    const deliveryOption = DELIVERY.NAMES.find(option => option.id === id);
    return deliveryOption ? deliveryOption.name : ""; 
};

export const getDeliveryIdByName = (name: string) => {
    const deliveryOption = DELIVERY.NAMES.find(option => option.name === name);
    return deliveryOption ? deliveryOption.id : ""; 
};