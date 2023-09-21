import RegisterForm from '@/components/forms/register';
import config from '@/config';
import routes from '@/routes';
import Link from 'next/link';

const Register = () => {
  return (
    <main className="w-full flex items-center mt-12 flex-col">
      <section className="w-2/6 shadow-sm shadow-slate-500 px-8 py-2 rounded-lg">
        <h2 className="text-lg text-center">Register Form</h2>
        <RegisterForm captchaKey={config.reCaptcha as string} />
      </section>

      <p className="mt-8 text-lg">
        Already have an account ?{' '}
        <Link href={routes.pages.login()} className="font-semibold">
          Login here
        </Link>
      </p>
    </main>
  );
};

export default Register;
