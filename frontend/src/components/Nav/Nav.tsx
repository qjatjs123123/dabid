import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { PAGE_URL } from '../../util/Constants';
import { useRecoilState } from 'recoil';
import { activePageState } from '../../stores/recoilStores/activePageState';

const Nav: React.FC = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useRecoilState(activePageState);
  // const { auctionId } = useParams<{ auctionId: string }>();
  const auctionId = location.pathname.split('/')[2]; // auctionId 경매번호 추출

  const breadcrumbPaths = [
    { name: '홈', link: `${PAGE_URL.HOME}` },
    { name: '경매 목록', link: `${PAGE_URL.AUCTION_LIST}` },
    { name: '등록하기', link: `${PAGE_URL.AUCTION_INPUT}` },
    { name: `${auctionId}번째 경매`, link: `/auctions/${auctionId}` },
    { name: '고객 센터', link: `${PAGE_URL.HELP}` },
    { name: '마이 페이지', link: `${PAGE_URL.MY_PAGE}` },
    // { name: activePage || '현재 페이지', link: '#' },
  ].filter((path) => location.pathname.includes(path.link));

  const shouldShowBreadcrumb = location.pathname !== '/';
  console.log('location', location.pathname);
  console.log('shouldShowBreadcrumb', shouldShowBreadcrumb);
  console.log('breadcrumbPaths', breadcrumbPaths);

  return (
    <>
      {shouldShowBreadcrumb && breadcrumbPaths.length > 0 && (
        <nav className="container h-[30px] w-full border-b border-gray-300 flex flex-row">
          <Breadcrumb paths={breadcrumbPaths} />
        </nav>
      )}
    </>
  );
};

export default Nav;
