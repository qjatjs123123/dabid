import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserInfo, userState } from '../../stores/recoilStores/Member/userState';
import { formatNumberWithCommas } from '../../util/moneyComma';
import { loginState } from '../../stores/recoilStores/Member/loginState';
import { PAGE_URL } from '../../util/Constants';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../util/Functions';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useRecoilValue<UserInfo | null>(userState);
  const [token, setToken] = useRecoilState(loginState);
  console.log('userInfo:', userInfo);
  console.log(userInfo?.accountActive);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(false);
    window.location.href = `${PAGE_URL.HOME}`;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="font-medium rounded-lg text-sm px-5 py-2.5 flex flex-row"
        type="button"
      >
        <img src={`${userInfo?.imageUrl}`} alt="" className="h-[30px] m-1 rounded-full" />
        <div className="text-center inline-flex items-center">
          <span className="ml-2">
            {userInfo?.nickname} 님
            <br />
            {!userInfo?.accountActive && <span className="text-red-500">계좌 등록 필요</span>}
            {userInfo?.accountActive && `${formatNumberWithCommas(userInfo?.point ?? 0)} p`}
          </span>
          <svg
            className={`w-2.5 h-2.5 ms-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link to={`${PAGE_URL.MY_PAGE}`} className="flex items-center px-4 py-2 hover:bg-gray-100">
                <img src={getImgUrl('navbar/nav-mypage.svg')} alt="마이페이지" className="max-h-5 w-5 mr-2" />
                <p className="text-sm">마이페이지</p>
              </Link>
            </li>
            <li>
              <Link to={`${PAGE_URL.AUCTION_INPUT}`} className="flex items-center px-4 py-2 hover:bg-gray-100">
                <img src={getImgUrl('navbar/nav-create.svg')} alt="경매 등록" className="max-h-5 w-5 mr-2" />
                <p className="text-sm">경매 등록하기</p>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center px-4 py-2 hover:bg-gray-100">
                <img src={getImgUrl('navbar/nav-logout.svg')} alt="로그아웃" className="max-h-5 w-5 mr-2" />
                <p>로그아웃</p>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
