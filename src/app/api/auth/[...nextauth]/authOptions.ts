/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { env } from '@/lib/env';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'test@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;

        const res = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/auth/exporter/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: username,
              password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (res.status === 201) {
          const user = await res.json();
          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.onboardingStatus) {
        token.user.onboardingStatus = session.onboardingStatus;
      }

      if (user) {
        return {
          ...token,
          ...user,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        };
      }

      if (Date.now() / 1000 < token.exp) return token;

      return {
        ...token,
        exp: Math.floor(Date.now() / 1000) + 60 * 5,
      };
    },

    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.onboardingStatus = token.user?.onboardingStatus;
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  secret: env.NEXTAUTH_SECRET,
};
