import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MEMBER_API_URL, PAGE_URL } from './util/Constants';
import PrivateRoute from './util/PrivateRoute';
import About from './pages/About';
import Deal from './pages/Deal/Deal';
import LoginModal from './pages/Login/LoginModal';
import Mypage from './pages/MyPage/Mypage';
import FloatingActionButtons from './components/Floating/FloatingButtons';
import SignUp from './pages/Signup/Signup';
import { init } from './api/ChatbotAPI';
import { useRecoilState } from 'recoil';
import { modalState } from './stores/recoilStores/Member/modalState';

import AuctionList from './pages/Auction/AuctionList';
import AuctionInput from './pages/Auction/components/Auctions/AuctionInput';
import AuctionDetail from './pages/Auction/AuctionDetail';
import Inquiry from './pages/Inquiry/Inquiry';
import { UserInfo, userState } from './stores/recoilStores/Member/userState';
import axios from './api/axiosConfig';
import { useState } from 'react';
import NotFound from './pages/NotFound';
import Header from './components/Header/Header';

function App() {
  const [isModalOpen, setModalOpen] = useRecoilState(modalState);
  const [, setUserInfo] = useRecoilState<UserInfo | null>(userState);
  const [isBankOpenDeal, setIsBankOpenDeal] = useState<boolean>(false); // BankModal 상태 관리
  const [isChatbotOpenDeal, setIsChatbotOpenDeal] = useState<boolean>(false); // ChatbotModal 상태 관리
  const navigate = useNavigate();
  const handleLoginSuccess = async () => {
    const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
    await setUserInfo(response.data);
    setModalOpen(false);
    init(response.data.email);
    navigate(PAGE_URL.HOME); // 로그인 성공 후 홈으로 리다이렉트
  };

  const isLoggedIn = localStorage.getItem('accessToken');
  const visiblePaths = Object.values(PAGE_URL);
  const isAuctionDetail = /^\/auctions\/\d+$/;
  return (
    <>
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
      {visiblePaths.includes(location.pathname) || isAuctionDetail.test(location.pathname) ? <Header /> : null}

      {visiblePaths.includes(location.pathname) || isAuctionDetail.test(location.pathname) ? (
        <div className="w-full h-[100px]"></div>
      ) : null}

      <Routes>
        <Route path={`${PAGE_URL.HOME}`} element={<About />} />
        <Route path={`${PAGE_URL.SIGN_UP}`} element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
        <Route path={`${PAGE_URL.AUCTION_LIST}`} element={<AuctionList />} />
        <Route path="/*" element={<NotFound />} />
        <Route element={<PrivateRoute setModalOpen={setModalOpen} />}>
          <Route
            path={`${PAGE_URL.DEAL}`}
            element={<Deal isBankOpenDeal={isBankOpenDeal} isChatbotOpenDeal={isChatbotOpenDeal} />}
          />
          <Route path={`${PAGE_URL.MY_PAGE}`} element={<Mypage />} />
          <Route path={PAGE_URL.AUCTION_DETAIL} element={<AuctionDetail />} />
          <Route path={`${PAGE_URL.AUCTION_INPUT}`} element={<AuctionInput />} />
          <Route path={`${PAGE_URL.HELP}`} element={<Inquiry />} />
        </Route>
      </Routes>

      <FloatingActionButtons setIsBankOpenDeal={setIsBankOpenDeal} setIsChatbotOpenDeal={setIsChatbotOpenDeal} />
    </>
  );
}

export default App;
