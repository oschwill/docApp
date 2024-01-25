import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import { getHeaderTitle } from '../utils/helperFuntions';

const RootLayout = () => {
  const location = useLocation();

  const headerTitle = getHeaderTitle(location.pathname);

  return (
    <>
      <div>
        <Header isHome={location.pathname === '/' ? true : false}>{headerTitle}</Header>
        <main className="mb-[15%]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
