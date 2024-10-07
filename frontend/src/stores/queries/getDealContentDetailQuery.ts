import { useQuery } from '@tanstack/react-query'; // useSuspenseQuery 대신 useQuery 사용
import axios from '../../api/axiosConfig';
import { DEAL_API_URL } from '../../util/Constants';

interface DealContent {
  id: number;
  seller_nickname: string;
  title: string;
  detail: string;
  image: string;
  winning_bid: number;
  status: string;
  isTimerVisible: boolean;
  account: string;
  carrierId: string | null;
  trackingNumber: string | null;
  seller: boolean
}

export function getDealContentDetailQuery(dealId: number) {
  return useQuery<DealContent, Error>({
    queryKey: [`dealContentDetailKey_${dealId}`],
    queryFn: async () => {
      const response = await axios.get<DealContent>(
        `${import.meta.env.VITE_SERVER_ENDPOINT}${DEAL_API_URL.GET_DEAL_CONTENT_DETAIL}/${dealId}`,
      );
      return response.data; // 응답 데이터 반환
    },
    enabled: dealId !== -1, // dealId가 -1이 아닐 때만 쿼리 활성화
    staleTime: 1000,
  });
}
