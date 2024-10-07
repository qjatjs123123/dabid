import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCourierInfo } from "../../../api/DealApi";

const usePostCourierInfo = (curDealId: number, deliveryNumber: string, carrierId: string) => {
    const queryClient = useQueryClient();
    const formattedCarrierId = carrierId.toUpperCase().replace(/\./g, '_');

    return useMutation({
        mutationFn: () => postCourierInfo(curDealId, { carrierId: formattedCarrierId, trackingNumber: deliveryNumber }),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['postCourierInfo'] });
            const previousData = queryClient.getQueryData([`dealContentDetailKey_${curDealId}`]);
            queryClient.setQueryData([`dealContentDetailKey_${curDealId}`], (oldData: any) => {
                if (oldData) {
                    return {
                        ...oldData,
                        carrierId,
                        trackingNumber: deliveryNumber,
                    };
                }
                return oldData;
            });
            return { previousData };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData([`dealContentDetailKey_${curDealId}`], context.previousData);
            }
            queryClient.invalidateQueries({ queryKey: [`dealContentDetailKey_${curDealId}`] });
        },
        onSettled: (_data, _error, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: [`dealContentDetailKey_${curDealId}`] });
        },
    });
};

export default usePostCourierInfo;
