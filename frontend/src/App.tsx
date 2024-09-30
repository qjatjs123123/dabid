import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './util/PrivateRoute';
import About from './pages/About';
import Deal from './pages/Deal/Deal';
import AuctionList from './pages/Auction/AuctionList';
import AuctionInput from './pages/Auction/components/Auctions/AuctionInput';
import AuctionDetail from './pages/Auction/AuctionDetail';
import { PAGE_URL } from './util/Constants';

function App() {
  return (
    <Routes>
      <Route path={`${PAGE_URL.HOME}`} element={<About />} />

      <Route element={<PrivateRoute />}>
        <Route path={`${PAGE_URL.DEAL}`} element={<Deal />} />
        <Route path={`${PAGE_URL.AUCTION_LIST}`} element={<AuctionList />} />
        <Route path={`${PAGE_URL.AUCTION_DETAIL}`} element={<AuctionDetail />} />
        <Route path={`${PAGE_URL.AUCTION_INPUT}`} element={<AuctionInput />} />
      </Route>
    </Routes>
  );
}

export default App;
