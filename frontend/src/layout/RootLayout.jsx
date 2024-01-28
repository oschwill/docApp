import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import { getHeaderTitle } from '../utils/helperFuntions';
import { FullNameContext } from '../context/Context';
import { useEffect, useState } from 'react';
import { checkLogin, getUserCredentials } from '../utils/helperFuntions.js';

const RootLayout = () => {
  const [userName, setUserName] = useState(null);
  const location = useLocation();

  const headerTitle = getHeaderTitle(location.pathname);
  checkLogin;
  useEffect(() => {
    if (checkLogin && getUserCredentials('fullName')) {
      setUserName(getUserCredentials('fullName'));
    }
  }, []);

  return (
    <>
      <div>
        <FullNameContext.Provider value={{ userName, setUserName }}>
          <Header isHome={location.pathname === '/' ? true : false}>{headerTitle}</Header>
          <main className="mb-[35%]">
            <Outlet />
          </main>
        </FullNameContext.Provider>
      </div>
    </>
  );
};

export default RootLayout;
