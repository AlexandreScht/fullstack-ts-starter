'use client';

import Button from '@/components/buttons';
import InputField from '@/components/inputs/field';
import useAppContext from '@/hooks/AppProvider';
import type { AuthFormType } from '@/interfaces/services';
import { registerSchemaValidator } from '@/libs/valideModules';
import routes from '@/routes';
import cn from '@/utils/cn';
import merge from 'deepmerge';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

type response = {
  status: boolean;
  message: string | null;
};

const RegisterForm = ({ captchaKey }: { captchaKey: string }) => {
  const { data: session } = useSession();
  if (session) {
    redirect(routes.pages.home());
  }

  const router = useRouter();
  const [response, setResponse] = useState<response | null>(null);
  const reRef = useRef<ReCAPTCHA | null>(null);

  const {
    services: { register },
  } = useAppContext();

  const initialValues: AuthFormType = {
    email: '',
    password: '',
  };

  const handleSubmit = useCallback(
    async (FormValues: AuthFormType) => {
      const token: string | null = (await reRef.current?.executeAsync()) || null;
      if (!token) {
        return setResponse({ status: false, message: 'Something went wrong' });
      }

      const RegisterValues = merge(FormValues, { token }) as AuthFormType;

      const [error, res] = await register(RegisterValues);
      reRef.current?.reset();

      const status = !error;
      const message = status ? res : error;

      setResponse({ status, message: message });
      return;
    },
    [register, router],
  );

  const redirectLink = () => {
    router.push(routes.pages.home());
  };

  return (
    <div className="w-full">
      {response && (
        <div>
          <p className={cn('text-center p-2 mt-4', response.status ? 'bg-lime-100 text-green-600' : 'bg-red-100 text-red-600')}>{response.message}</p>
        </div>
      )}
      <ReCAPTCHA sitekey={captchaKey} size="invisible" ref={ref => (reRef.current = ref)} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchemaValidator}>
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
              showError
              classNames={{
                errorMessage: 'text-md',
                label: 'text-md',
                inputWrapper: 'h-12',
                input: 'text-md',
              }}
            />

            <div className="flex items-center justify-center my-8 gap-2">
              <Button type="submit" disabled={!(dirty && isValid)} isLoading={isSubmitting}>
                Register
              </Button>

              <Button onClick={redirectLink} className="ml-4 relative border-red-600 text-red-600 hover:bg-red-600">
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
