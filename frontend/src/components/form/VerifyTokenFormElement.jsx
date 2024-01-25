import PropTypes from 'prop-types';
import ErrorToolTip from '../error/ErrorToolTip';

const VerifyTokenFormElement = ({
  onRefreshToken,
  formData,
  onHandleChangeUserFormData,
  onHandleVerifyToken,
  refresh,
}) => {
  return (
    <>
      <div className="flex mt-6 items-center">
        <h2>Token erneut senden, klick hier {'=>'}:</h2>
        <img
          src="/images/refresh.png"
          alt="refresh Token"
          className="h-28 hover:opacity-75 cursor-pointer"
          onClick={onRefreshToken}
        />
      </div>
      <div className="mt-6 flex gap-4 mb-4 relative">
        <label htmlFor="verifyToken">Verifizierungstoken:</label>
        <input
          type="text"
          value={formData.verifyToken}
          onChange={onHandleChangeUserFormData}
          id="verifyToken"
          name="verifyToken"
          className="text-black"
        />
        {formData.errors && formData.errors.verifyToken && (
          <ErrorToolTip errorMessage={formData.errors.verifyToken} refresh={refresh} />
        )}
      </div>
      <p
        className="bg-gray-500 p-4 w-full text-center hover:opacity-75"
        onClick={onHandleVerifyToken}
      >
        SENDEN
      </p>
    </>
  );
};

VerifyTokenFormElement.propTypes = {
  onRefreshToken: PropTypes.func,
  formData: PropTypes.object,
  onHandleChangeUserFormData: PropTypes.func,
  onHandleVerifyToken: PropTypes.func,
  refresh: PropTypes.string,
};

export default VerifyTokenFormElement;
