import { atom } from 'recoil';

export const dealStatusState = atom<string | undefined>({
  key: 'dealStatusState', 
  default: "",   
});