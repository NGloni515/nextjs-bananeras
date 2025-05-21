const isServer = typeof window === 'undefined';

function required(name: string, value?: string): string {
  if (!value) {
    if (isServer) {
      throw new Error(`Missing environment variable: ${name}`);
    } else {
      console.warn(`Warning: Missing public environment variable: ${name}`);
      return '';
    }
  }
  return value;
}

export const env = {
  NEXT_PUBLIC_API_URL: required(
    'NEXT_PUBLIC_API_URL',
    process.env.NEXT_PUBLIC_API_URL
  ),
  NEXT_PORTAL_URL: process.env.NEXT_PORTAL_URL ?? '',

  ...(isServer && {
    NEXTAUTH_SECRET: required('NEXTAUTH_SECRET', process.env.NEXTAUTH_SECRET),
    NEXTAUTH_URL: required('NEXTAUTH_URL', process.env.NEXTAUTH_URL),
  }),
};
