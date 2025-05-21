import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: true,
  });

  const pathname = req.nextUrl.pathname;

  console.log('[Middleware] Requested path:', pathname);
  console.log('[Middleware] Token:', token);
  console.log('[Middleware] User role:', token?.user?.role);
  console.log('[Middleware] Onboarding status:', token?.user?.onboardingStatus);

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
