import { atom } from 'recoil';

export const dealIsContent = atom<boolean>({
  key: 'dealIsContentState', 
  default: false,   
});