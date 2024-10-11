import axios from '../../api/axiosConfig';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DEAL_API_URL } from '../../util/Constants';

interface DealContent {
  id: number;
  seller_nickname: string;
  title: string;
  detail: string;
  image: string;
  winning_bid: number;
  status: string;
  created_at: [number, number, number, number, number, number, number]; 
  timerVisible: boolean;
  seller_imageUrl: string;
  buyer_nickname: string;
  buyer_imageUrl: string;
}

interface DealContentListResponse {
  content: DealContent[]; // 현재 페이지의 데이터 배열
  totalPages: number; // 전체 페이지 수
  number: number; // 현재 페이지 번호
  pages: any[];
}

export function getDealContentListQuery() {
  return useInfiniteQuery<DealContentListResponse, Error>({
    queryKey: ['dealContentListKey'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axios.get<DealContentListResponse>(
        `${import.meta.env.VITE_SERVER_ENDPOINT}${DEAL_API_URL.GET_DEAL_CONTENT_LIST}?page=${pageParam}&size=5`,
      );

      return response.data; // API에서 반환된 데이터
    },
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages;
      const nextPage = lastPage.number + 1;
      return nextPage < totalPages ? nextPage : undefined; // 다음 페이지가 있을 경우에만 반환
    },
    initialPageParam: 0, // 초기 페이지 번호를 0으로 설정
  });
}
