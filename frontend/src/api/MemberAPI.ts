import axios from 'axios';
import { MEMBER_API_URL } from '../util/Constants';
import { Navigate, Outlet } from 'react-router-dom';
import { PAGE_URL } from '../util/Constants';

// const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem('accessToken');

export const AuthApi = axios.create({
  baseURL: 'https://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

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

// export function login(email:string, password: string) {
//     return useQuery<LoginContent, Error>({
//     }
// }

export const login = async ({ email, password }: LoginParams): Promise<LoginContent> => {
  const data = { email, password };
  const response = await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.SIGN_IN}`, data);
  // console.log(response);
  // console.log(response.data);
  // userState에 user 저장

  return response.data;
};

interface SignupParams {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phoneNumber: string;
  //   image_url: File;
}

export const signup = async ({ email, password }: SignupParams): Promise<any> => {
  const data = { email, password };
  const response = await AuthApi.post(`${MEMBER_API_URL.SIGN_UP}`, data);
  return response.data;
};

export const logout = async (): Promise<any> => {
  localStorage.removeItem('accessToken');
  return null;
};
