import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import axios from '../../../api/axiosConfig';
import { MEMBER_API_URL } from '../../../util/Constants';

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

export const useUpdateUserState = () => {
  const setUserInfo = useSetRecoilState(userState);

  const updateUserState = async () => {
    try {
      const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('User info update failed:', error);
    }
  };

  return updateUserState;
};
