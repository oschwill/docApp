import RegisterForm from '../components/form/RegisterForm';

const Register = () => {
  return (
    <section className="flex flex-col gap-16 justify-center items-center mb-4">
      <article className="w-[92.5%] text-[1.5rem]">
        <h2 className="text-[3rem] text-center">Registrierung</h2>
        <div className="border-2">
          <RegisterForm />
        </div>
      </article>
    </section>
  );
};

export default Register;
