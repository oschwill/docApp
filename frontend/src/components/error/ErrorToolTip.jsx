import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ErrorToolTip = ({ errorMessage, refresh }) => {
  const [showToolTip, setShowTooltip] = useState(true);

  useEffect(() => {
    setShowTooltip(true);
  }, [refresh]);

  return (
    <div
      className={`absolute ${!showToolTip && 'hidden'}`}
      style={{ right: 0, bottom: 40 }}
      onClick={() => setShowTooltip(false)}
    >
      <div className="bg-errorMessageBGColor text-white text-xs rounded py-1 px-2 right-0 p-4">
        <span className="text-[1.25rem] p-4 w-[260px] inline-block font-bold leading-[1.5rem]">
          {errorMessage}
        </span>
        <svg
          className="absolute text-errorMessageBGColor h-6 w-full left-0 top-full"
          x="0px"
          y="50px"
          viewBox="0 0 255 255"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};

ErrorToolTip.propTypes = {
  errorMessage: PropTypes.string,
  refresh: PropTypes.string,
};

export default ErrorToolTip;
