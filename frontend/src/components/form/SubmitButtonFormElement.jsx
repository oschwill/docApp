import PropTypes from 'prop-types';

const SubmitButtonFormElement = ({ value }) => {
  return (
    <div className="mt-8  flex justify-center">
      <input
        type="submit"
        value={value}
        className="bg-mainBGButtonColor w-full p-4 hover:bg-mainBGButtonColorHover"
      />
    </div>
  );
};

SubmitButtonFormElement.propTypes = {
  value: PropTypes.string,
};

export default SubmitButtonFormElement;
