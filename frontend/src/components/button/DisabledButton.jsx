import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const DisabledLink = ({ isDisabled, to, children }) => {
  const handleClick = (event) => {
    if (isDisabled) {
      event.preventDefault();
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="p-8 rounded-2xl bg-secondBGButtonColor text-center w-full flex items-center justify-center"
      style={{ pointerEvents: isDisabled ? 'none' : '', opacity: isDisabled ? 0.5 : 1 }}
    >
      {children}
    </Link>
  );
};

DisabledLink.propTypes = {
  isDisabled: PropTypes.bool,
  to: PropTypes.string,
  children: PropTypes.object,
};

export default DisabledLink;
