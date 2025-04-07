import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      exporterId: string;
      onboardingStatus: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      exporterId: string;
      onboardingStatus: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
    exp: number;
  }
}
