import { DEAL_STAGE_2, DELIVERY } from './Constants'

export const getDeliveryNameById = (id: string) => {
    const deliveryOption = DELIVERY.NAMES.find(option => option.id === id);
    return deliveryOption ? deliveryOption.name : ""; 
};

export const getDeliveryIdByName = (name: string) => {
    const deliveryOption = DELIVERY.NAMES.find(option => option.name === name);
    return deliveryOption ? deliveryOption.id : ""; 
};

export const getDealStageNameById = (id: string | undefined) => {
    return DEAL_STAGE_2.find(stage => stage.id === id);

  };
  