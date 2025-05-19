export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
  NEXT_PORTAL_URL: process.env.NEXT_PORTAL_URL ?? '',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? '',
} as const;
