import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosConfig";
import { DEAL_API_URL } from "../../util/Constants";

interface InquireDemandDepositAccountBalance {
    REC: Rec;
}

interface Rec {
    accountNo: string;
    accountBalance: number;
}

export function getDealSellerAccountQuery(dealId: number) {
    return useQuery<InquireDemandDepositAccountBalance, Error>({
      queryKey: [`dealSllerAccountKey_${dealId}`],
      queryFn: async () => {
        const response = await axios.post<InquireDemandDepositAccountBalance>(
          `${import.meta.env.VITE_SERVER_ENDPOINT}${DEAL_API_URL.GET_DEAL_SELLER_ACCOUNT}/${dealId}`,
        );
        return response.data; // 응답 데이터 반환
      },
      enabled: dealId !== -1, // dealId가 -1이 아닐 때만 쿼리 활성화
      staleTime: 1000,
    });
  }
  