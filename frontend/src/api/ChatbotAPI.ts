import axios from 'axios';
import { CHATBOT_API_URL } from '../util/Constants';

const defaultAxios = axios.create({ baseURL: import.meta.env.VITE_SERVER_ENDPOINT, withCredentials: false });

export const init = async (email: string): Promise<any> => {
  const data = { email };

  try {
    await defaultAxios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}${CHATBOT_API_URL.INITIATE_CHATBOT}`, data);
  } catch (err) {
    console.error('챗봇 초기화 실패:', err);
    throw new Error('챗봇 초기화에 실패했습니다.'); // 오류 처리
  }
};

interface HistoryContents {
  role: string;
  content: string;
}

export const list = async (email: string): Promise<HistoryContents[]> => {
  try {
    const response = await defaultAxios.get(
      `${import.meta.env.VITE_SERVER_ENDPOINT}${CHATBOT_API_URL.GET_CHAT_HISTORY}?email=${email}`,
    );
    return response.data;
  } catch (err) {
    console.error('대화 내역 조회 실패:', err);
    return [];
  }
};

export const send = async (email: string, message: string): Promise<{ reply: string }> => {
  const data = { email, message };

  try {
    const response = await defaultAxios.post(
      `${import.meta.env.VITE_SERVER_ENDPOINT}${CHATBOT_API_URL.POST_QUESTION}`,
      data,
    );
    return response.data;
  } catch (err) {
    console.error('메시지 전송 실패:', err);
    throw new Error('메시지 전송에 실패했습니다.');
  }
};
