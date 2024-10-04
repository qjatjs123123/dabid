// src/api/transferApi.ts
import axios from 'axios';

// 송금 API 호출 함수
export const transferBalance = async (dealId: number, accessToken: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_ENDPOINT}/api/deal/transfer/${dealId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
        },
      },
    );
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    throw error; // 에러를 호출한 쪽에서 처리하도록 전달
  }
};
