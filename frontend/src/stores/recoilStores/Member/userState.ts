import { atom } from 'recoil';

export interface UserInfo {
  email: string;
  phoneNumber: string;
  nickname: string;
  imageUrl: string;
  point: number;
  role: string;
  accountNo: string;
  accountActive: boolean;
}

export const userState = atom<UserInfo | null>({
  key: 'userState',
  default: null,
});
