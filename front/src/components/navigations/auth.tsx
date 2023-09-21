'use client';
import routes from '@/routes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const auth = () => {
  const { data: session } = useSession();

  return (
    <ul className="mr-8 min-w-2/12 text-xl flex justify-between space-x-8">
      {session ? (
        <li className="hover:opacity-60">
          <Link href={routes.pages.logout()}>
            <span>Log Out</span>
          </Link>
        </li>
      ) : (
        <>
          <li className="hover:opacity-60">
            <Link href={routes.pages.login()}>
              <span>Login</span>
            </Link>
          </li>
          <li className="hover:opacity-60">
            <Link href={routes.pages.register()}>
              <span>Register</span>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default auth;
