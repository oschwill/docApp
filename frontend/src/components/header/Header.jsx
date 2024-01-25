import PropTypes from 'prop-types';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isHome, children }) => {
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const handleSetShowOptions = () => {
    setShowAuthOptions((cur) => !cur);
  };

  const navigate = useNavigate();
  return (
    <header className="mb-10">
      <section className="flex flex-col justify-center items-center mt-10">
        <article className="flex justify-between items-center w-[92.5%] relative">
          {!isHome ? (
            <img
              src="/images/arrowLeft.png"
              alt="Left Arrow"
              onClick={() => navigate(-1)}
              className="h-6 cursor-pointer"
            />
          ) : (
            <p className="text-[1.5rem]">
              <Link to="/login">Please Login</Link>
            </p>
          )}
          <p className="text-[1.5rem] font-bold">{children}</p>
          <div className="flex gap-12">
            <img src="/images/calendar.png" alt="calendar" className="cursor-pointer" />
            <img
              src="/images/dotMenu.png"
              alt="calendar"
              className="hover:opacity-5 cursor-pointer"
              onClick={() => handleSetShowOptions()}
            />
          </div>
          {showAuthOptions && (
            <div className="flex flex-col absolute right-0 top-10 border-2 p-4 bg-secondFontColor text-[1.5rem]">
              <Link to="/login" className="underline font-bold text-blue-700">
                Login
              </Link>
              <Link to="register" className="underline font-bold text-blue-700">
                Register
              </Link>
            </div>
          )}
        </article>
      </section>
    </header>
  );
};

Header.propTypes = {
  isHome: PropTypes.bool,
  children: PropTypes.string,
};

export default Header;
