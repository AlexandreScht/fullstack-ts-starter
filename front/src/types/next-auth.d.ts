// TODO package file type here */

import type NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      exp?: number;
      iat?: number;
      jti?: string;
      jwt?: string;
    };
  }
  interface Profile {
    email_verified: boolean;
    email: string;
    at_hash: string;
    jwt: string;
  }
  interface User {
    jwt?: string;
  }
}

export default NextAuth;
