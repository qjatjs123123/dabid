export const PAGE_URL = {
  HOME: '/',
  DEAL: '/deal',

  INFO: '/info',
  HELP: '/help',
  SIGN_UP: '/sign-up',
  CREATE: '/auction/input',
  MY_PAGE: '/my-page',

  AUCTION_LIST: '/auction',
  AUCTION_DETAIL: '/auctions/:auctionId',
  AUCTION_INPUT: `/auction/input`,
};

export const DEAL_API_URL = {
  GET_DEAL_CONTENT_LIST: '/api/deal/list',
  GET_DEAL_CONTENT_DETAIL: '/api/deal/list',
  GET_DEAL_SELLER_ACCOUNT: '/api/deal/account/seller',
  POST_DEAL_COURIER_INFO: 'api/deal/courier',
};

export const SKELETON_TIME = {
  TIME: 500,
};

export const MEMBER_API_URL = {
  SIGN_UP: '/api/member/auth/sign-up',
  SIGN_IN: '/api/member/auth/sign-in',
  SIGN_OUT: '/api/member/auth/sign-out',
  RANDOM_NICKNAME: '/api/member/auth/random-nickname',
  CHECK_DUPLICATION: '/api/member/auth/check',
  PHONE_AUTH: '/api/member/auth/phone-auth',
  PHONE_CHECK: '/api/member/auth/phone-check',

  MY_INFO: '/api/member/info',
  ACCOUNT_AUTH: '/api/member/account-auth',
  ACCOUNT_CHECK: '/api/member/account-check',
  POINT_IN: '/api/member/point-in',
  POINT_OUT: '/api/member/point-out',

  ACCOUNT_TRANSACTION: '/api/member/transaction',
  ACCOUNT_BALANCE: '/api/member/balance',
};

export const INQUIRY_API_URL = {
  INQUIRY_LIST: '/api/inquiry/my-list',
  INQUIRY_CREATE: '/api/inquiry/',
  INQUIRY_PRINT: '/api/inquiry/file',
  INQUIRY_EXCEL: '/api/inquiry/excel',
};

export const AUCTION_API_URL = {
  GET_AUCTION_CONTENT: '/api/auctions',
  GET_AUCTION_INTERACTION: 'api/biddings',
};

export const CHATBOT_API_URL = {
  INITIATE_CHATBOT: '/chatbot/init',
  GET_CHAT_HISTORY: '/chatbot/list',
  POST_QUESTION: '/chatbot/ask',
};

export const DELIVERY = {
  NAMES: Object.freeze([
    {
      id: 'kr.cjlogistics',
      name: 'CJ대한통운',
    },
    {
      id: 'kr.coupangls',
      name: '쿠팡 로지스틱스 서비스',
    },
    {
      id: 'kr.cupost',
      name: 'CU 편의점택배',
    },
    {
      id: 'kr.chunilps',
      name: '천일택배',
    },
    {
      id: 'kr.cvsnet',
      name: 'GS Postbox',
    },
  ]),
};

export const DELIVERY_STAGE = [
  { icon: '📦', label: '인수', name: '잡하' },
  { icon: '🚚', label: '이동', name: '잡하' },
  { icon: '🏠', label: '배송지', name: '캠프도착' },
  { icon: '🚀', label: '배송중', name: '배송출발' },
  { icon: '✅', label: '배송완료', name: '배송완료' },
];

// export const DEAL_STAGE = ['낙찰', '입금', '배송', '배송 확인', '거래 완료']
export const DEAL_STAGE = [
  { name: '낙찰', id: 'BID_SUCCESS' },
  { name: '입금', id: 'PAYMENT_COMPLETE' },
  { name: '배송', id: 'IN_TRANSIT' },
  { name: '배송완료', id: 'DELIVERED' },
  { name: '거래 완료', id: 'TRANSACTION_DONE' },
];

export const DEAL_STAGE_2 = [
  { name: '낙찰', id: 'BID_SUCCESS', color: '#34C759' }, // 초록색
  { name: '입금완료', id: 'PAYMENT_COMPLETE', color: '#FFD60A' }, // 노란색
  { name: '배송중', id: 'IN_TRANSIT', color: '#0A84FF' },
  { name: '배송완료', id: 'DELIVERED', color: '#FF9F0A' }, // 주황색
  { name: '거래 완료', id: 'TRANSACTION_DONE', color: 'gray' }, // 파란색
  { name: '거래 오류', id: 'ERROR', color: '#FF3B30' }, // 빨간색
];

export const MESSAGE = {
  DELIVERY_NO_CONTENTS: '운송장 미등록 상태이거나 업체에서 상품을 준비중입니다.',
  FIND_NO_CONTENTS: '검색결과가 없습니다.',
  DEAL_LIST_NO_CONTENTS: '텅',
  API_POST_ENROLL: '저장중...',
  API_POST_SUCESS: '운송장이 저장되었습니다.',
  API_ERROR: '오류가 발생하였습니다.',

  API_ACCOUNT_AUTH: '계좌 인증 요청 중...',
  API_ACCOUNT_SUCCESS: '계좌 인증 요청 완료',
  API_ACCOUNT_ERROR: '계좌 인증 오류 발생',
  API_ACCOUNT_COMPLETE: '계좌 인증 완료',

  API_SIGNUP_SUCCESS: '회원 가입 완료',
};

export const DELAY_TIME_START = 400;
export const DELAY_TIME_END = 700;
export const DELAY_TIME_END_LONG = 3000;
