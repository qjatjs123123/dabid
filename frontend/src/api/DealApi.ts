import axios from "./axiosConfig";
import { DEAL_API_URL } from "../util/Constants";

interface CourierInfo {
    carrierId: string;     
    trackingNumber: string;    
}
export const postCourierInfo = async (dealId : number, info: CourierInfo) => {
    try{
        const response = await axios.post(DEAL_API_URL.POST_DEAL_COURIER_INFO + `/${dealId}`, info)
        return response.data;
    }
    catch(err) {
        console.log(err)
        throw err;
    }
}