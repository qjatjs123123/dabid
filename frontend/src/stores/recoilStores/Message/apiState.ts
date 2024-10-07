import { atom } from 'recoil';

export const apiState = atom({
  key: 'apiState',
  default: {
    message: '',
    state: false
  },
});
