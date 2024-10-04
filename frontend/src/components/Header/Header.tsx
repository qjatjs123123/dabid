import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';
import { MEMBER_API_URL, PAGE_URL } from '../../util/Constants';
import { getImgUrl } from '../../util/Functions';
import { useRecoilState } from 'recoil';
import { modalState } from '../../stores/recoilStores/Member/modalState';
import { loginState } from '../../stores/recoilStores/Member/loginState';
import { UserInfo, userState } from '../../stores/recoilStores/Member/userState';
import { formatNumberWithCommas } from '../../util/moneyComma';
import './Header.css';
import UserDropdown from './Dropdown';

const NavBar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [_, setModalOpen] = useRecoilState(modalState);
  const [token, setToken] = useRecoilState(loginState);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setIsAuthenticated(true);
      setToken(true);

      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
          await setUserInfo(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserInfo(); // 사용자 정보를 가져옵니다.
    }
  }, [token, setToken]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setToken(false);
    window.location.href = `${PAGE_URL.HOME}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={`${PAGE_URL.HOME}`} className="navbar-logo">
          <img src={getImgUrl('navbar/dabid-logo.png')} alt="다비드 로고" className="max-h-15 h-[50px]" />
        </Link>
        <div className={`navbar-menu`}>
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to={`${PAGE_URL.AUCTION_LIST}`}>
                <img src={getImgUrl('navbar/nav-info.png')} alt="경매 둘러보기" className="navbar-logo-img" />
              </Link>
              <Link to={`${PAGE_URL.AUCTION_LIST}`}>경매 둘러보기</Link>
            </li>

            <li className="navbar-item">
              <Link to={`${PAGE_URL.HELP}`}>
                <img src={getImgUrl('navbar/nav-help.png')} alt="고객센터" className="navbar-logo-img" />
              </Link>
              <Link to={`${PAGE_URL.HELP}`}>고객센터</Link>
            </li>

            {!isAuthenticated && (
              <li className="navbar-item">
                <button onClick={() => setModalOpen(true)} className="flex items-center">
                  <img src={getImgUrl('navbar/nav-sign-up.png')} alt="로그인" className="navbar-logo-img" />
                  <span>로그인</span>
                </button>
              </li>
            )}
            {isAuthenticated && <UserDropdown />}
          </ul>
        </div>
        <button className="navbar-button" type="button" onClick={toggleMenu}>
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="navbar-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </span>
        </button>
      </div>
      <div className={`toggle-navbar-menu${isMenuOpen ? ' open' : ''}`}>
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to={`${PAGE_URL.AUCTION_LIST}`}>경매 둘러보기</Link>
          </li>

          <li className="navbar-item">
            <Link to={`${PAGE_URL.HELP}`}>고객센터</Link>
          </li>
          {!isAuthenticated && (
            <li className="navbar-item">
              <button onClick={() => setModalOpen(true)}>
                <span>로그인</span>
              </button>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li className="navbar-item">
                <Link to={`${PAGE_URL.CREATE}`}>경매 등록하기</Link>
              </li>
              <li className="navbar-item">
                <Link to={`${PAGE_URL.MY_PAGE}`}>마이페이지</Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout}>로그아웃</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
