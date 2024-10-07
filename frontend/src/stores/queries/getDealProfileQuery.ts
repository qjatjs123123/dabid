import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosConfig";
import { MEMBER_API_URL } from "../../util/Constants";

interface UserResponse {
    code: string;            // "SU"
    message: string;         // "Success."
    email: string;           // "qwer1212@gmail.com"
    phoneNumber: string;     // "010-4564-9350"
    nickname: string;        // "은밀한 고래밥"
    imageUrl: string | null; // null 값일 수 있음
    point: number;           // 10000
    role: string;            // "USER"
  }
  

export function getDealProfileQuery() {
    return useQuery<UserResponse, Error>({
      queryKey: [`userInfo`],
      queryFn: async () => {
        const response = await axios.get<UserResponse>(
          `${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.MY_INFO}`,
        );
        return response.data; // 응답 데이터 반환
      },
      staleTime: Infinity,
    });
  }
  