import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PAGE_URL } from './util/Constants';
import PrivateRoute from './util/PrivateRoute';
import About from './pages/About';
import Deal from './pages/Deal/Deal';
import Auction from './pages/Auction/Auction';
import LoginModal from './pages/Login/LoginModal'; // 모달 컴포넌트 임포트
import Mypage from './pages/MyPage/Mypage';
import Logout from './pages/Logout/Logout';
import { useState } from 'react';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setModalOpen(false);
    navigate(PAGE_URL.HOME); // 로그인 성공 후 홈으로 리다이렉트
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        로그인
      </button>
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onLoginSuccess={handleLoginSuccess} />

      <Routes>
        <Route path={`${PAGE_URL.HOME}`} element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path={`${PAGE_URL.DEAL}`} element={<Deal />} />
          <Route path={`${PAGE_URL.AUCTION}`} element={<Auction />} />
          <Route path={`${PAGE_URL.MY_PAGE}`} element={<Mypage />} />
          <Route path={`${PAGE_URL.LOG_OUT}`} element={<Logout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
