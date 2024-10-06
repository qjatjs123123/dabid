import axios from 'axios';
import { MEMBER_API_URL } from '../util/Constants';

// const TOKEN_TYPE = localStorage.getItem("tokenType");
// let ACCESS_TOKEN = localStorage.getItem('accessToken');

// export const AuthApi = axios.create({
//   baseURL: 'https://j11a505.p.ssafy.io',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${ACCESS_TOKEN}`,
//   },
// });

interface LoginParams {
  email: string;
  password: string;
}

interface LoginContent {
  code: string;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export const login = async ({ email, password }: LoginParams): Promise<LoginContent> => {
  const data = { email, password };
  const response = await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.SIGN_IN}`, data);

  return response.data; // 로그인 성공 여부와 토큰을 반환
};
interface SignupParams {
  email: string;
  password: string;
  // password_check: string;
  nickname: string;
  phoneNumber: string;
  image: File | null;
}

export const signup = async ({ email, password, nickname, phoneNumber, image }: SignupParams): Promise<any> => {
  const data = { email, password, nickname, phoneNumber, image };
  const response = await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.SIGN_UP}`, data);
  return response.data;
};

// export const logout = async (): Promise<any> => {
//   localStorage.removeItem('accessToken');
//   return null;
// };

export const randomNickname = async (): Promise<string> => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.RANDOM_NICKNAME}`);
  // console.log(response.data);
  return response.data.nickname;
};

export const phoneNumberAuth = async (phoneNumber: string): Promise<any> => {
  const response = await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.PHONE_AUTH}`, {
    phoneNumber,
  });
  return response.data;
};

interface phoneCheckParams {
  phoneNumber: string;
  code: string;
}

export const phoneNumberCheck = async ({ phoneNumber, code }: phoneCheckParams): Promise<any> => {
  const data = { phoneNumber, code };
  console.log(data);
  const response = await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.PHONE_CHECK}`, data);
  return response.data;
};

interface checkDuplicateParams {
  valueType: string;
  value: string;
}

export const checkDuplication = async ({ valueType, value }: checkDuplicateParams): Promise<any> => {
  const data = { valueType, value };
  const response = await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.CHECK_DUPLICATION}`, data);
  return response.data;
};
