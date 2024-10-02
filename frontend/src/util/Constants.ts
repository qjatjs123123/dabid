export const PAGE_URL = {
  HOME: '/',
  DEAL: '/deal',
  AUCTION: '/auction',

  INFO: '/info',
  HELP: '/help',
  SIGN_UP: '/sign-up',
  LOG_IN: '/log-in',
  LOG_OUT: '/log-out',
  CREATE: '/create',
  MY_PAGE: '/my-page',
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

  ACCOUNT_AUTH: '/api/member/account-auth',
  ACCOUNT_CHECK: '/api/member/account-check',
  POINT_IN: '/api/member/point-in',
  POINT_OUT: '/api/member/point-out',

  ACCOUNT_TRANSACTION: '/api/member/transaction',
  ACCOUNT_BALANCE: '/api/member/balance',
};

export const DELIVERY = {
  NAMES: Object.freeze([
    {
      id: "kr.cjlogistics",
      name: "CJ대한통운"
    },
    {
      id: "kr.coupangls",
      name: "쿠팡 로지스틱스 서비스"
    },
    {
      id: "kr.cupost",
      name: "CU 편의점택배"
    },
    {
      id: "kr.chunilps",
      name: "천일택배"
    },
    {
      id: "kr.cvsnet",
      name: "GS Postbox"
    }

  ])
}

export  const DELIVERY_STAGE = [
  { icon: "📦", label: "인수", name:"잡하" },
  { icon: "🚚", label: "이동", name:"잡하" },
  { icon: "🏠", label: "배송지", name:"캠프도착" },
  { icon: "🚀", label: "배송중", name:"배송출발" },
  { icon: "✅", label: "배송완료", name:"배송완료" },
];

// export const DEAL_STAGE = ['낙찰', '입금', '배송', '배송 확인', '거래 완료']
export const DEAL_STAGE = [
  {name:'낙찰', id:'BID_SUCCESS'},
  {name: '입금', id:'PAYMENT_COMPLETE'},
  {name: '배송', id:'IN_TRANSIT'},
  {name: '배송완료', id:'DELIVERED'},
  {name: '거래 완료', id:'TRANSACTION_DONE'}
]

export const MESSAGE = {
  DELIVERY_NO_CONTENTS: "운송장 미등록 상태이거나 업체에서 상품을 준비중입니다.", 
  FIND_NO_CONTENTS : "검색결과가 없습니다."
}