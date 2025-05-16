export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const roleBasedRoutes = [
  { path: '/dashboard/box-brands/add-cutting-type', roles: ['QUALITY'] },
  { path: '/dashboard/export/add-cutting-sheet', roles: ['QUALITY'] },
  { path: '/dashboard/box-brands/add-verifier', roles: ['QUALITY'] },
  { path: '/dashboard/box-brands/cutting-types', roles: ['QUALITY'] },
  { path: '/dashboard/export/cutting-sheets', roles: ['QUALITY'] },
  { path: '/dashboard/box-brands/verifiers', roles: ['QUALITY'] },
  { path: '/dashboard/liquidation', roles: ['ADMINISTRATIVE'] },
  { path: '/dashboard/user/update-user', roles: ['ADMINISTRATIVE'] },
  { path: '/dashboard/settings', roles: ['ADMINISTRATIVE'] },
  { path: '/dashboard/producer/upload-logo', roles: ['ADMINISTRATIVE'] },
  { path: '/dashboard/producer', roles: ['LOGISTICS', 'EXPORT'] },
  { path: '/dashboard/client', roles: ['LOGISTICS', 'EXPORT'] },
  { path: '/dashboard/box-brands', roles: ['LOGISTICS', 'EXPORT'] },
  { path: '/dashboard/export', roles: ['EXPORT'] },
];

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(signInUrl);
  }

  const userRole = token.user?.role;
  if (!userRole) {
    const unauthorizedUrl = new URL('/dashboard', req.url);
    unauthorizedUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(unauthorizedUrl);
  }

  if (userRole === 'MASTER') {
    return NextResponse.next();
  }

  const routeConfig = roleBasedRoutes.find((route) =>
    pathname.startsWith(route.path)
  );

  if (routeConfig && !routeConfig.roles.includes(userRole)) {
    const unauthorizedUrl = new URL('/dashboard', req.url);
    unauthorizedUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
