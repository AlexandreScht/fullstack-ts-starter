import { ClientException, InvalidCredentialsError } from '@/exceptions';
import type { AuthFormType, GoogleFormType } from '@/interfaces/services';
import routes from '@/routes';
import ServerSideServices from '@/utils/apiServices';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'string',
          placeholder: 'myMail@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password, token } = credentials as AuthFormType;

        if (!email || !password || !token) {
          throw new ClientException(400, 'Please enter an email and password');
        }

        const {
          ApiServices: { login },
        } = ServerSideServices();

        const [error, user] = await login({ email, password, token });

        if (error) {
          throw new InvalidCredentialsError(error);
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 2 * 24 * 60 * 60, // 2 jours
  },
  jwt: {
    maxAge: 4 * 60 * 24 * 30, // double of session maxAge
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.replace(baseUrl, '') === routes.pages.login()) {
        return routes.pages.home();
      }
      if (url.replace(baseUrl, '') === routes.pages.logout()) {
        return routes.pages.login();
      }
      return url;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'credentials') {
        return true;
      }
      if (account?.provider === 'google' && profile?.email_verified && profile?.email?.endsWith('@gmail.com')) {
        const { id_token } = account;
        const { at_hash } = profile;

        const {
          ApiServices: { GoogleLogin },
        } = ServerSideServices();

        const [error, userBack] = await GoogleLogin({
          at_hash,
          id_token,
        } as GoogleFormType);

        if (error) {
          throw new InvalidCredentialsError(error);
        }

        if (!userBack) {
          throw new ClientException(400, 'something went wrong !');
        }
        user.jwt = userBack.jwt;

        return true;
      }
      return false;
    },
  },
};
