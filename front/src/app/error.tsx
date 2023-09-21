'use client';

import Button from '@/components/buttons';
import routes from '@/routes';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <div className="w-full h-full fixed top-0 z-auto bg-gradient-to-r from-purple-300 to-blue-200">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8 px-2">
            <div className="border-t border-gray-200 text-center pt-8">
              <h1 className="text-9xl font-bold text-purple-400">404</h1>
              <h1 className="text-5xl font-medium py-8">{error.message}</h1>
              <p className="text-2xl pb-8 px-12 font-medium">Please try again later or contact support if the problem persists</p>
              <div className="flex flex-row justify-center">
                <Button
                  onClick={() => reset()}
                  className="bg-gradient-to-r w-auto from-purple-400 to-blue-500 outline-none hover:from-purple-300 hover:to-blue-200 hover:text-black text-white font-semibold px-6 py-3 rounded-md mr-6"
                >
                  Try again
                </Button>
                <Link href={routes.pages.home()}>
                  <Button className="bg-gradient-to-r w-auto outline-none from-slate-500 to-slate-800 hover:from-slate-200 hover:to-slate-400 hover:text-black text-white font-semibold px-6 py-3 rounded-md">
                    Go Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
