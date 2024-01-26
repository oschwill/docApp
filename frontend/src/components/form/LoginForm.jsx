import { useContext, useReducer, useState } from 'react';
import { initialUserLoginState, reducer, validateUserForm } from '../../utils/stateHandler';
import SubmitButtonFormElement from './SubmitButtonFormElement';
import UserCredentialsFormElement from './UserCredentialsFormElement';
import { sendData } from '../../utils/fetchData';
import { useNavigate } from 'react-router-dom';
import { FullNameContext } from '../../context/Context';
import { getUserCredentials } from '../../utils/helperFuntions';

const LoginForm = () => {
  const [userFormData, userFormDispatch] = useReducer(reducer, initialUserLoginState);
  const [refreshToolTip, setRefreshToolTip] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUserName } = useContext(FullNameContext);

  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Errors wieder clearn
    userFormDispatch({ type: 'SET_ERROR', errors: {} });
    setRefreshToolTip(crypto.randomUUID());

    // Dann starten wir mal den Login
    const formData = new FormData();
    const formErrors = validateUserForm(userFormData, 'login');

    if (Object.keys(formErrors).length > 0) {
      setIsLoading(false);
      userFormDispatch({ type: 'SET_ERROR', errors: formErrors });
      return;
    }

    // FormData bauen
    formData.append('email', userFormData.email);
    formData.append('password', userFormData.password);

    // Login starten
    const response = await sendData('POST', '/api/v1/user/login', formData);

    setIsLoading(false);

    if (response.data && response.data.success) {
      setUserName(getUserCredentials('fullName'));
      // navigate to home
      navigate('/');
      return;
    }

    setErrorMessage(response.response.data.message);
  };

  const handleChangeUserFormData = (e) => {
    //
    userFormDispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <UserCredentialsFormElement
        isLoginForm={true}
        formData={userFormData}
        onHandleChangeFormData={handleChangeUserFormData}
        refresh={refreshToolTip}
      />
      {errorMessage && (
        <div className="text-center">
          <p className="bg-red-400 text-white p-4 text-[1.5rem] font-bold">{errorMessage}</p>
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center fixed bottom-[62.5%] left-[45%]">
          <img src="/images/LoadSite.gif" alt="isloading...." className="h-16" />
        </div>
      ) : (
        <SubmitButtonFormElement value="LOGIN" />
      )}
    </form>
  );
};

export default LoginForm;
