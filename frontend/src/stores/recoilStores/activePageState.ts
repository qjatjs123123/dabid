import { atom } from 'recoil';

export const activePageState = atom({
  key: 'activePage',
  default: '홈',
});
