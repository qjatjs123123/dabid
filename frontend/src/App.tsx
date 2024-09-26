import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './util/PrivateRoute';
import About from './pages/About';
import Deal from './pages/Deal/Deal';
import Auction from './pages/Auction';
import { PAGE_URL } from './util/Constants';

function App() {
  return (
    <Routes>
      <Route path={`${PAGE_URL.HOME}`} element={<About />} />
      <Route element={<PrivateRoute />}>
        <Route path={`${PAGE_URL.DEAL}`} element={<Deal />} />
        <Route path={`${PAGE_URL.AUCTION}`} element={<Auction />} />
      </Route>
    </Routes>
  );
}

export default App;
