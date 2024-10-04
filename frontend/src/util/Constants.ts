export const PAGE_URL = {
  HOME: '/',
  DEAL: '/deal',
  AUCTION: '/auction',

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

export const AUCTION_API_URL = {
  GET_AUCTION_CONTENT: '/api/auctions',
  GET_AUCTION_INTERACTION: 'api/biddings',
};

export const CHATBOT_API_URL = {
  INITIATE_CHATBOT: '/chatbot/init',
  GET_CHAT_HISTORY: '/chatbot/list',
  POST_QUESTION: '/chatbot/ask',
};
