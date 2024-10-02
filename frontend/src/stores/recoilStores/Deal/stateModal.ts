import { atom } from 'recoil';

export const isModalState = atom({
  key: 'isModalOpen', 
  default: false,   
});