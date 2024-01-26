import { useReducer, useState } from 'react';
import AddressFormElement from './AddressFormElement';
import FinalInformationFormElement from './FinalInformationFormElement';
import SubmitButtonFormElement from './SubmitButtonFormElement';
import UserCredentialsFormElement from './UserCredentialsFormElement';
import UserTypeFormElement from './UserTypeFormElement';
import { initialUserState, reducer, validateUserForm } from '../../utils/stateHandler';
import { createCleanedUserState, createObject } from '../../utils/helperFuntions';
import { sendData } from '../../utils/fetchData';
import { Link } from 'react-router-dom';
import VerifyTokenFormElement from './VerifyTokenFormElement';

const RegisterForm = () => {
  const [userType, setUserType] = useState(null);
  const [userFormData, userFormDispatch] = useReducer(reducer, initialUserState);
  const [refreshToolTip, setRefreshToolTip] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSetUserType = (value) => {
    setUserType(value);
  };

  const handleChangeUserFormData = (e) => {
    if (!e.target) {
      userFormDispatch({ type: 'SET_FIELD', field: 'expertise', value: e.map((exp) => exp.value) });

      return;
    }
    if (e.target.name === 'profileImage') {
      userFormDispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.files[0] });
      return;
    }
    userFormDispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // Errors clearn
    userFormDispatch({ type: 'SET_ERROR', errors: {} });
    setIsLoading(true);

    const formData = new FormData();
    formData.append('type', userType);

    setRefreshToolTip(crypto.randomUUID());

    const formErrors = validateUserForm(userFormData, userType);

    if (Object.keys(formErrors).length > 0) {
      setIsLoading(false);
      userFormDispatch({ type: 'SET_ERROR', errors: formErrors });
      return;
    }

    // Wir bauen nun endlich unser formData yuuuhuuu nach 5 Stunden
    switch (userType) {
      case 'patient':
        {
          const cleanStateKeys = createCleanedUserState(userFormData, userType);

          Object.keys(cleanStateKeys).forEach((key) => {
            formData.append(key, userFormData[key]);
          });
        }
        break;
      case 'doctor':
        {
          const cleanStateKeys = createCleanedUserState(userFormData, userType);

          Object.keys(cleanStateKeys).forEach((key) => {
            if (key === 'expertise') {
              // mit `${key}[${index}]` sagen wir ihm explizit es muss ein Array sein auch wenn wir nur einen Wert haben
              userFormData[key].forEach((exp, index) => formData.append(`${key}[${index}]`, exp));
            } else if (key === 'workingTime') {
              formData.append(key, cleanStateKeys.workingTime);
            } else {
              formData.append(key, userFormData[key]);
            }
          });
        }
        break;

      default:
        break;
    }

    // versenden der Daten
    const response = await sendData('POST', '/api/v1/user/register', formData);

    setIsLoading(false);
    if (response.data && response.data.success) {
      setSuccessMessage(response.data.message);
      return;
    }

    const customError = createObject(
      response.response.data.path[0],
      response.response.data.message
    );
    userFormDispatch({ type: 'SET_ERROR', errors: customError });
  };

  const onVerifyToken = async () => {
    userFormDispatch({ type: 'SET_ERROR', errors: {} });
    setRefreshToolTip(crypto.randomUUID());

    if (!userFormData.verifyToken) {
      const customError = createObject('verifyToken', 'Bitte Geben Sie den Verify Token ein');
      userFormDispatch({ type: 'SET_ERROR', errors: customError });
      return;
    }

    const data = {
      emailVerifyCode: userFormData.verifyToken,
      email: userFormData.email,
    };

    const response = await sendData('PATCH', '/api/v1/user/verify', data);

    if (response.data.success) {
      setSuccessMessage(response.data.message);
      setIsRegistered(true);
      return;
    }
  };

  const refreshToken = async () => {
    const response = await sendData('POST', '/api/v1/user/resendEmailToken', {
      email: userFormData.email,
    });

    if (response.data.success) {
      setSuccessMessage(response.data.message);
      return;
    }

    const customError = createObject('verifyToken', response.data.message);
    userFormDispatch({ type: 'SET_ERROR', errors: customError });
  };

  return (
    <form onSubmit={onSubmitForm} encType="multipart/form-data">
      <UserTypeFormElement
        onHandleSetUserType={handleSetUserType}
        hasSuccessMessage={!!successMessage}
      />
      {userType && (
        <>
          <UserCredentialsFormElement
            isLoginForm={false}
            userType={userType}
            formData={userFormData}
            onHandleChangeFormData={handleChangeUserFormData}
            refresh={refreshToolTip}
            hasSuccessMessage={!!successMessage}
          />
          <AddressFormElement
            userType={userType}
            formData={userFormData}
            onHandleChangeFormData={handleChangeUserFormData}
            refresh={refreshToolTip}
            hasSuccessMessage={!!successMessage}
          />
          <FinalInformationFormElement
            userType={userType}
            formData={userFormData}
            onHandleChangeFormData={handleChangeUserFormData}
            refresh={refreshToolTip}
            hasSuccessMessage={!!successMessage}
          />
          {successMessage && (
            <div className="bg-green-600 p-4 text-[1.5rem] mb-6 text-white font-bold">
              {successMessage}

              {!isRegistered && (
                <VerifyTokenFormElement
                  onRefreshToken={refreshToken}
                  formData={userFormData}
                  onHandleChangeUserFormData={handleChangeUserFormData}
                  onHandleVerifyToken={onVerifyToken}
                  refresh={refreshToolTip}
                />
              )}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center fixed bottom-5 left-[45%]">
              <img src="/images/LoadSite.gif" alt="isloading...." className="h-16" />
            </div>
          ) : (
            <>
              {!successMessage ? (
                <SubmitButtonFormElement value="SENDEN" />
              ) : (
                <p className="text-center">
                  <Link to="/" className="underline text-blue-700">
                    Zu Home
                  </Link>
                </p>
              )}
            </>
          )}
        </>
      )}
    </form>
  );
};

export default RegisterForm;
