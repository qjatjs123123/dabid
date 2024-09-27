import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './util/PrivateRoute';
import About from './pages/About';
import Deal from './pages/Deal/Deal';
import Auction from './pages/Auction';
import Login from './pages/Login/Login';
import { PAGE_URL } from './util/Constants';
import Mypage from './pages/MyPage/Mypage';

function App() {
  return (
    <Routes>
      <Route path={`${PAGE_URL.HOME}`} element={<About />} />
      <Route path={`${PAGE_URL.LOG_IN}`} element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path={`${PAGE_URL.DEAL}`} element={<Deal />} />
        <Route path={`${PAGE_URL.AUCTION}`} element={<Auction />} />
        <Route path={`${PAGE_URL.MY_PAGE}`} element={<Mypage />} />
      </Route>
    </Routes>
  );
}

export default App;
