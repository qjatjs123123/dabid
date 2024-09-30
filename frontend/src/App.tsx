import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PAGE_URL } from './util/Constants';
import PrivateRoute from './util/PrivateRoute';
import About from './pages/About';
import Deal from './pages/Deal/Deal';
import Auction from './pages/Auction/Auction';
import LoginModal from './pages/Login/LoginModal'; // 모달 컴포넌트 임포트
import Mypage from './pages/MyPage/Mypage';
import Signup from './pages/Signup/Signup';
import { useRecoilState } from 'recoil';
import { modalState } from './stores/recoilStores/Member/modalState'; // Recoil 상태 임포트

function App() {
  const [isModalOpen, setModalOpen] = useRecoilState(modalState); // Recoil 상태 사용
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setModalOpen(false);
    navigate(PAGE_URL.HOME); // 로그인 성공 후 홈으로 리다이렉트
  };

  return (
    <>
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Recoil 상태 변경
        onLoginSuccess={handleLoginSuccess}
      />

      <Routes>
        <Route path={`${PAGE_URL.HOME}`} element={<About />} />
        <Route path={`${PAGE_URL.SIGN_UP}`} element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path={`${PAGE_URL.DEAL}`} element={<Deal />} />
          <Route path={`${PAGE_URL.AUCTION}`} element={<Auction />} />
          <Route path={`${PAGE_URL.MY_PAGE}`} element={<Mypage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
