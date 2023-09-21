import { authOptions } from '@/config/authOption';
import routes from '@/routes';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Home() {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session) {
    redirect(routes.pages.login());
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Welcome</h1>
        <span>{session.user.email}</span>
      </div>
    </main>
  );
}
