'use client';

import Button from '@/components/buttons';
import InputField from '@/components/inputs/field';
import { loginSchemaValidator } from '@/libs/valideModules';
import routes from '@/routes';
import merge from 'deepmerge';
import { Form, Formik } from 'formik';
import { SignInResponse, signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = ({ errorMessage, captchaKey }: { errorMessage: string | null; captchaKey: string }) => {
  const [err, setErr] = useState<String | null>(errorMessage);
  const router = useRouter();
  const reRef = useRef<ReCAPTCHA | null>(null);

  const { data: session } = useSession();
  if (session) {
    redirect(routes.pages.home());
  }

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = useCallback(
    async (FormValues: FormValues) => {
      const token: string | null = (await reRef.current?.executeAsync()) || null;
      if (!token) {
        return setErr('Something went wrong');
      }
      const LoginValues = merge(FormValues, { token, redirect: true });
      const response: SignInResponse | undefined = await signIn('credentials', LoginValues);
      reRef.current?.reset();
      if (response?.error) {
        setErr(response.error);
      }

      return;
    },
    [router],
  );

  return (
    <div className="w-full">
      {err && (
        <div>
          <p className="text-center p-2 bg-red-100 text-red-600">{err}</p>
        </div>
      )}
      <ReCAPTCHA sitekey={captchaKey} size="invisible" ref={ref => (reRef.current = ref)} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchemaValidator}>
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="p-2 flex flex-col gap-3">
            <InputField
              type="email"
              name="email"
              fullWidth
              isClearable
              radius="sm"
              required
              classNames={{
                errorMessage: 'text-md',
                label: 'text-md',
                base: 'my-4',
                inputWrapper: 'py-0 h-12',
              }}
            />

            <InputField
              type="password"
              name="password"
              fullWidth
              radius="sm"
              required
              endContents={[VscEye, VscEyeClosed]}
              classNames={{
                errorMessage: 'text-md',
                label: 'text-md',
                base: 'my-4',
                inputWrapper: 'py-0 h-12',
              }}
            />

            <Button className="text-xl relative w-full mt-8 py-5" type="submit" disabled={!(dirty && isValid)} isLoading={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
