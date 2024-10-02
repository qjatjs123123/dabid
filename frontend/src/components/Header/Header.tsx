import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_URL } from '../../util/Constants';
import { getImgUrl } from '../../util/Functions';
import { useRecoilState } from 'recoil';
import { modalState } from '../../stores/recoilStores/Member/modalState';
// import { userState } from '../../stores/recoilStores/Member/userState'; // 유저 정보 State
import { loginState } from '../../stores/recoilStores/Member/loginState';
import './Header.css';

const NavBar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [_, setModalOpen] = useRecoilState(modalState);
  // const [user, setUser] = useRecoilState(userState); 유저 정보 저장 State
  const [token, setToken] = useRecoilState(loginState);

  useEffect(() => {
    if (token !== '') {
      setIsAuthenticated(true);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setToken('');
    window.location.href = `${PAGE_URL.HOME}`;
  };

  const toggleMenu = () => {
    console.log(isAuthenticated);
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
              <Link to={`${PAGE_URL.AUCTION}`}>
                <img src={getImgUrl('navbar/nav-info.png')} alt="경매 둘러보기" className="navbar-logo-img" />
              </Link>
              <Link to={`${PAGE_URL.AUCTION}`}>경매 둘러보기</Link>
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

            {isAuthenticated && (
              <>
                <li className="navbar-item">
                  <Link to={`${PAGE_URL.MY_PAGE}`}>
                    <img src={getImgUrl('navbar/nav-sign-up.png')} alt="임시 이미지" className="navbar-logo-img" />
                  </Link>
                  <Link to={`${PAGE_URL.MY_PAGE}`}>마이페이지</Link>
                </li>
                <li className="navbar-item">
                  <button onClick={handleLogout}>
                    <img src={getImgUrl('navbar/nav-sign-up.png')} alt="임시 이미지" className="navbar-logo-img" />
                  </button>
                  <button onClick={handleLogout}>로그아웃</button>
                </li>
              </>
            )}
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
            <Link to={`${PAGE_URL.AUCTION}`}>경매 둘러보기</Link>
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
