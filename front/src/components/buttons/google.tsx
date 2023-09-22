'use client';
import routes from '@/routes';
import { SignInResponse, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Button from './index';

const O2google = () => {
  const router = useRouter();

  const handleClick = useCallback(async () => {
    const response: SignInResponse | undefined = await signIn('google');

    if (response?.error) {
      router.push(routes.pages.login({ error: response?.error }));
      return;
    }

    router.push(routes.pages.login());

    return;
  }, [router]);

  return (
    <Button onClick={handleClick} className="text-xl relative w-full mt-8 mb-6 py-5">
      <FcGoogle className="h-6 w-6 -mr-2" />
      oogle
    </Button>
  );
};

export default O2google;
