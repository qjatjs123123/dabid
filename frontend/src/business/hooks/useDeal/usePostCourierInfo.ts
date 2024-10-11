import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCourierInfo } from "../../../api/DealApi";
import { getDealContentListQuery } from "../../../stores/queries/getDealContentListQuery";

import { MESSAGE } from "../../../util/Constants";
import { delaySetApiInfo } from "../../../util/Functions";
import { useRecoilState } from "recoil";
import { apiState } from "../../../stores/recoilStores/Message/apiState";
import { DELAY_TIME_END, DELAY_TIME_END_LONG } from "../../../util/Constants";
import { useRef } from "react";

const usePostCourierInfo = (curDealId: number, deliveryNumber: string, carrierId: string) => {
    const queryClient = useQueryClient();
    const formattedCarrierId = carrierId.toUpperCase().replace(/\./g, '_');
    const [apiInfo, setApiInfo] = useRecoilState(apiState);
    const { refetch } = getDealContentListQuery(); 
    const isLoading = useRef(false); 

    return useMutation({
        mutationFn: () => postCourierInfo(curDealId, { carrierId: formattedCarrierId, trackingNumber: deliveryNumber }),
        onMutate: async () => {
            if (isLoading.current) return; 
            isLoading.current = true;
            await delaySetApiInfo(setApiInfo,MESSAGE.API_POST_ENROLL, DELAY_TIME_END);

            await queryClient.cancelQueries({ queryKey: ['postCourierInfo'] });
            const previousData = queryClient.getQueryData([`dealContentDetailKey_${curDealId}`]);
            isLoading.current = false; 

            queryClient.setQueryData([`dealContentDetailKey_${curDealId}`], (oldData: any) => {
                if (oldData) {
                    return {
                        ...oldData,

                    };
                }
                return oldData;
            });

            return { previousData };
        },
        onError: (_err, _variables, context) => {

            if (context?.previousData) 
                queryClient.setQueryData([`dealContentDetailKey_${curDealId}`], context.previousData);
            
        },
        onSettled: async (data, _error, _variables, context) => {
            queryClient.invalidateQueries({ queryKey: [`dealContentDetailKey_${curDealId}`] });

            if (data === 'ERROR' || !data  )  delaySetApiInfo(setApiInfo, MESSAGE.API_ERROR, DELAY_TIME_END_LONG); 
            else delaySetApiInfo(setApiInfo, MESSAGE.API_POST_SUCESS, DELAY_TIME_END_LONG);    
        },
        onSuccess: () => {
            refetch();
        }
    });
};

export default usePostCourierInfo;
