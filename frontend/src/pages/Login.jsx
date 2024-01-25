import LoginForm from '../components/form/LoginForm';

const Login = () => {
  return (
    <section className="flex flex-col gap-16 justify-center items-center mb-6">
      <article className="w-[92.5%] text-[1.5rem]">
        <h2 className="text-[3rem] text-center">Login</h2>
        <div className="border-2">
          <LoginForm />
        </div>
      </article>
    </section>
  );
};

export default Login;
