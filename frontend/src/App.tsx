import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MEMBER_API_URL, PAGE_URL } from './util/Constants';
import PrivateRoute from './util/PrivateRoute';
import About from './pages/About';
import Deal from './pages/Deal/Deal';
import Auction from './pages/Auction/Auction';
import LoginModal from './pages/Login/LoginModal';
import Mypage from './pages/MyPage/Mypage';
import FloatingActionButtons from './components/Floating/FloatingButtons';
import Signup from './pages/Signup/Signup';
import { init } from './api/ChatbotAPI';
import { useRecoilState } from 'recoil';
import { modalState } from './stores/recoilStores/Member/modalState';

import AuctionList from './pages/Auction/AuctionList';
import AuctionInput from './pages/Auction/components/Auctions/AuctionInput';
import AuctionDetail from './pages/Auction/AuctionDetail';
import Inquiry from './pages/Inquiry/Inquiry';
import { UserInfo, userState } from './stores/recoilStores/Member/userState';
import axios from './api/axiosConfig';

function App() {
  const [isModalOpen, setModalOpen] = useRecoilState(modalState);
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userState);
  const navigate = useNavigate();

  const handleLoginSuccess = async () => {
    const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
    await setUserInfo(response.data);
    setModalOpen(false);
    // const email = userInfo ? userInfo.email : ''; // 'xorjsghkd1011@gmail.com';
    // console.log('handleLoginSuccess:', email); // 'xorjsghkd1011@gmail.com'
    init(response.data.email);
    navigate(PAGE_URL.HOME); // 로그인 성공 후 홈으로 리다이렉트
  };

  return (
    <>
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onLoginSuccess={handleLoginSuccess} />

      <Routes>
        <Route path={`${PAGE_URL.HOME}`} element={<About />} />
        <Route path={`${PAGE_URL.HELP}`} element={<Inquiry />} />
        <Route path={`${PAGE_URL.SIGN_UP}`} element={<Signup />} />
        <Route path={`${PAGE_URL.AUCTION_LIST}`} element={<AuctionList />} />

        <Route element={<PrivateRoute />}>
          <Route path={`${PAGE_URL.DEAL}`} element={<Deal />} />
          <Route path={`${PAGE_URL.MY_PAGE}`} element={<Mypage />} />
          <Route path={`${PAGE_URL.AUCTION_DETAIL}`} element={<AuctionDetail />} />
          <Route path={`${PAGE_URL.AUCTION_INPUT}`} element={<AuctionInput />} />
        </Route>
      </Routes>

      <FloatingActionButtons />
    </>
  );
}

export default App;
