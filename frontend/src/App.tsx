import './App.css';
import { Route, Routes } from 'react-router-dom';
import { PAGE_URL } from './util/Constants';

import PrivateRoute from './util/PrivateRoute';
import About from './pages/About';
import Deal from './pages/Deal/Deal';
import Auction from './pages/Auction/Auction';
import Login from './pages/Login/Login';
import Mypage from './pages/MyPage/Mypage';
import Logout from './pages/Logout/Logout';
import AuctionList from './pages/Auction/AuctionList';
import AuctionInput from './pages/Auction/components/Auctions/AuctionInput';
import AuctionDetail from './pages/Auction/AuctionDetail';

function App() {
  return (
    <Routes>
      <Route path={`${PAGE_URL.HOME}`} element={<About />} />
      <Route path={`${PAGE_URL.LOG_IN}`} element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path={`${PAGE_URL.DEAL}`} element={<Deal />} />
        <Route path={`${PAGE_URL.AUCTION}`} element={<Auction />} />
        <Route path={`${PAGE_URL.MY_PAGE}`} element={<Mypage />} />
        <Route path={`${PAGE_URL.LOG_OUT}`} element={<Logout />} />
        <Route path={`${PAGE_URL.AUCTION_LIST}`} element={<AuctionList />} />
        <Route path={`${PAGE_URL.AUCTION_DETAIL}`} element={<AuctionDetail />} />
        <Route path={`${PAGE_URL.AUCTION_INPUT}`} element={<AuctionInput />} />
      </Route>
    </Routes>
  );
}

export default App;
