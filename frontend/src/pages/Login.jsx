import { useLocation } from 'react-router-dom';
import LoginForm from '../components/form/LoginForm';

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <section className="flex flex-col gap-16 justify-center items-center mb-6">
      <article className="w-[92.5%] text-[1.5rem]">
        <h2 className="text-[3rem] text-center">Login</h2>
        <div className="border-2">
          {message && (
            <p className="m-4 text-center text-[1.5rem] font-bold text-red-700">{message}</p>
          )}
          <LoginForm />
        </div>
      </article>
    </section>
  );
};

export default Login;
