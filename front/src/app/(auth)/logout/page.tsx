'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: true });
  }, [router]);

  return <p>Logging out...</p>;
}
