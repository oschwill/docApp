import PropTypes from 'prop-types';
import ErrorToolTip from '../error/ErrorToolTip';

const UserCredentialsFormElement = ({
  isLoginForm,
  userType,
  formData,
  onHandleChangeFormData,
  refresh,
  hasSuccessMessage,
}) => {
  return (
    <fieldset className="p-2">
      <legend>Geben Sie Ihren Namen und Passwort ein :</legend>

      <div className="flex flex-col gap-2">
        <div className="p-2 grid grid-cols-authForm relative">
          {userType === 'doctor' && (
            <>
              <label htmlFor="title" className="pr-4">
                Titel<span className="text-red-600 text-[2rem] font-bold">*</span>:
              </label>
              <select
                name="title"
                id="title"
                className="border-2"
                value={formData.title}
                onChange={onHandleChangeFormData}
                disabled={hasSuccessMessage}
              >
                <option value="">Bitte auswählen</option>
                <option value="Dr. med.">Dr. med.</option>
                <option value="Dr.med.dent.">Dr.med.dent.</option>
                <option value="Dr. rer. nat.">Dr. rer. nat.</option>
                <option value="Prof.">Prof.</option>
              </select>
              {formData.errors && formData.errors.title && (
                <ErrorToolTip errorMessage={formData.errors.title} refresh={refresh} />
              )}
            </>
          )}
        </div>
        {!isLoginForm && (
          <>
            <div className="p-2 grid grid-cols-authForm relative">
              <label htmlFor="firstName" className="pr-4">
                Vorname<span className="text-red-600 text-[2rem] font-bold">*</span>:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border-2"
                value={formData.firstName}
                onChange={onHandleChangeFormData}
                disabled={hasSuccessMessage}
              />
              {formData.errors && formData.errors.firstName && (
                <ErrorToolTip errorMessage={formData.errors.firstName} refresh={refresh} />
              )}
            </div>
            <div className="p-2 grid grid-cols-authForm relative">
              <label htmlFor="lastName" className="pr-4">
                Nachname<span className="text-red-600 text-[2rem] font-bold">*</span>:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border-2"
                value={formData.lastName}
                onChange={onHandleChangeFormData}
                disabled={hasSuccessMessage}
              />
              {formData.errors && formData.errors.lastName && (
                <ErrorToolTip errorMessage={formData.errors.lastName} refresh={refresh} />
              )}
            </div>
          </>
        )}
        <div className="p-2 grid grid-cols-authForm relative">
          <label htmlFor="email" className="pr-4">
            Email<span className="text-red-600 text-[2rem] font-bold">*</span>:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-2"
            value={formData.email}
            onChange={onHandleChangeFormData}
            disabled={hasSuccessMessage}
          />
          {formData.errors && formData.errors.email && (
            <ErrorToolTip errorMessage={formData.errors.email} refresh={refresh} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="p-2 grid grid-cols-authForm relative">
          <label htmlFor="password" className="pr-4">
            Password<span className="text-red-600 text-[2rem] font-bold">*</span>:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-2"
            value={formData.password}
            onChange={onHandleChangeFormData}
            disabled={hasSuccessMessage}
          />
          {formData.errors && formData.errors.password && (
            <ErrorToolTip errorMessage={formData.errors.password} refresh={refresh} />
          )}
        </div>
        {!isLoginForm && (
          <div className="p-2 grid grid-cols-authForm relative">
            <label htmlFor="repeatPassword" className="pr-4">
              Passwort wdh<span className="text-red-600 text-[2rem] font-bold">*</span>:
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              className="border-2 "
              value={formData.repeatPassword}
              onChange={onHandleChangeFormData}
              disabled={hasSuccessMessage}
            />
            {formData.errors && formData.errors.repeatPassword && (
              <ErrorToolTip errorMessage={formData.errors.repeatPassword} refresh={refresh} />
            )}
          </div>
        )}
        {userType === 'doctor' && (
          <div className="p-2 grid grid-cols-authForm items-center">
            <label htmlFor="profileImage" className="pr-4">
              Profilbild:
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              className="border-2"
              onChange={onHandleChangeFormData}
              disabled={hasSuccessMessage}
            />
          </div>
        )}
      </div>
    </fieldset>
  );
};

UserCredentialsFormElement.propTypes = {
  isLoginForm: PropTypes.bool,
  userType: PropTypes.string,
  formData: PropTypes.object,
  onHandleChangeFormData: PropTypes.func,
  refresh: PropTypes.string,
  hasSuccessMessage: PropTypes.bool,
};

export default UserCredentialsFormElement;
