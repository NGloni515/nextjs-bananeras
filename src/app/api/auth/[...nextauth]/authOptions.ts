import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { env } from '@/lib/env';

interface CustomUser {
  id: string;
  name: string;
  email: string;
  role: string;
  exporterId: string;
  onboardingStatus: string;
  accessToken: string;
  refreshToken: string;
}

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
      async authorize(credentials): Promise<import('next-auth').User | null> {
        if (!credentials?.username || !credentials?.password) return null;

        const res = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/auth/exporter/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (res.status === 201) {
          const user = (await res.json()) as CustomUser;
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.onboardingStatus && token.user) {
        token.user.onboardingStatus = session.onboardingStatus;
      }

      if (user) {
        const raw = user as unknown as {
          user: CustomUser;
          accessToken: string;
          refreshToken: string;
        };

        const u = raw.user;

        token.user = {
          id: String(u.id),
          name: u.name ?? '',
          email: u.email ?? '',
          role: u.role ?? '',
          exporterId: String(u.exporterId ?? ''),
          onboardingStatus: u.onboardingStatus ?? '',
        };

        token.accessToken = raw.accessToken ?? '';
        token.refreshToken = raw.refreshToken ?? '';
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
        return token;
      }

      if (Date.now() / 1000 < token.exp) {
        return token;
      }

      console.warn('[JWT] Token expirado, extendiendo temporalmente');
      token.exp = Math.floor(Date.now() / 1000) + 60 * 5;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },

  secret: env.NEXTAUTH_SECRET,
};
