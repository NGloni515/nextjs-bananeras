function required(name: string, value?: string): string {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const envServer = {
  NEXTAUTH_SECRET: required('NEXTAUTH_SECRET', process.env.NEXTAUTH_SECRET),
  NEXTAUTH_URL: required('NEXTAUTH_URL', process.env.NEXTAUTH_URL),
  NEXT_PUBLIC_API_URL: required(
    'NEXT_PUBLIC_API_URL',
    process.env.NEXT_PUBLIC_API_URL
  ),
};
