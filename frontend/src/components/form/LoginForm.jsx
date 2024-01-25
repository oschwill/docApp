import SubmitButtonFormElement from './SubmitButtonFormElement';
import UserCredentialsFormElement from './UserCredentialsFormElement';

const LoginForm = () => {
  return (
    <form>
      <UserCredentialsFormElement hasRepeatPassword={false} />
      <SubmitButtonFormElement value="LOGIN" />
    </form>
  );
};

export default LoginForm;
