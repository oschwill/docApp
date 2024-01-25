import PropTypes from 'prop-types';

const UserTypeFormElement = ({ onHandleSetUserType, hasSuccessMessage }) => {
  return (
    <fieldset className="p-2">
      <legend>
        Wählen Sie Ihre Rolle aus<span className="text-red-600 text-[2rem] font-bold">*</span>:
      </legend>
      <div className="flex gap-6 items-center">
        <div className="flex items-center">
          <label htmlFor="patient" className="pr-4">
            Patient:
          </label>
          <input
            type="radio"
            id="patient"
            name="type"
            onClick={() => onHandleSetUserType('patient')}
            disabled={hasSuccessMessage}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="doctor" className="pr-4">
            Arzt:
          </label>
          <input
            type="radio"
            id="doctor"
            name="type"
            value="doctor"
            onClick={() => onHandleSetUserType('doctor')}
            disabled={hasSuccessMessage}
          />
        </div>
      </div>
    </fieldset>
  );
};

UserTypeFormElement.propTypes = {
  onHandleSetUserType: PropTypes.func,
  hasSuccessMessage: PropTypes.bool,
};

export default UserTypeFormElement;
