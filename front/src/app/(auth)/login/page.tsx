import Button from '@/components/buttons';
import O2google from '@/components/buttons/google';
import LoginForm from '@/components/forms/login';
import config from '@/config';
import type { ConfirmAccountType } from '@/interfaces/services';
import routes from '@/routes';
import ServerSideServices from '@/utils/apiServices';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Login = async ({ searchParams }: { searchParams: { error?: string; token?: string } }) => {
  const {
    ApiServices: { confirmAccount },
  } = ServerSideServices();

  const updateAccount = async (): Promise<boolean | string> => {
    const [error] = await confirmAccount({
      accessToken: searchParams.token,
    } as ConfirmAccountType);

    if (error) {
      return error;
    }

    redirect(routes.pages.login());
  };

  const updatedAccount: null | boolean | string = searchParams?.token ? await updateAccount() : null;

  const error: string | null = searchParams.error ? searchParams.error : null;

  return (
    <main className="w-full flex items-center mt-12 flex-col">
      {searchParams?.token && updatedAccount ? (
        <div className="h-[75vh] flex flex-col items-center justify-center">
          <p className="text-center py-2 px-4 rounded-lg text-lg mb-8 bg-red-100 text-red-600">{updatedAccount}</p>
          <Link href={routes.pages.home()}>
            <Button>Home</Button>
          </Link>
        </div>
      ) : (
        <>
          <section className="w-full md:w-4/6 xl:w-2/6 shadow-sm shadow-slate-500 px-8 py-2 rounded-lg">
            <h2 className="text-lg text-center">Login Form</h2>
            <LoginForm errorMessage={error} captchaKey={config.reCaptcha as string} />
            <div className="w-full grid grid-cols-11 gap-x-4 items-center mt-8">
              <span className="w-full col-span-5 bg-black h-1 rounded-md"></span>
              <span className="bg-slate-50 col-span-1 text-center text-xl">Or</span>
              <span className="w-full col-span-5 bg-black h-1 rounded-md"></span>
            </div>
            <O2google />
          </section>
          <p className="mt-8 text-lg">
            Don&apos;t have an account?{' '}
            <Link href={routes.pages.register()} className="font-semibold">
              Register here
            </Link>
          </p>
        </>
      )}
    </main>
  );
};

export default Login;
