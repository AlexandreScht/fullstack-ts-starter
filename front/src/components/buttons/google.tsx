'use client';
import { SignInResponse, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Button from './index';

type CallbackResponse = {
  ok: boolean;
  error?: string;
};

const O2google = () => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    signIn('google').then((response: SignInResponse | undefined) => {
      if (response) {
        const { ok, error } = response as CallbackResponse;

        if (ok && !error) {
          // login success
          console.log(ok);

          router.push('/');

          return;
        }

        if (error) {
          // login error
          console.log(error);

          router.push(`/login?error=${error}`);
        }

        return;
      }
      router.push(`/login?error=Oops something went wrong!`);
    });
  }, [router]);
  return (
    <Button onClick={handleClick} className="text-xl relative w-full mt-8 mb-6 py-5">
      <FcGoogle className="h-6 w-6 -mr-2" />
      oogle
    </Button>
  );
};

export default O2google;
