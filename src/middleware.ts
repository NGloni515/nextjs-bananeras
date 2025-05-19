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

export async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  const { pathname } = req.nextUrl;

  console.log('[Middleware] Requested path:', pathname);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  console.log('[Middleware] Token:', token);

  if (!token) {
    console.log('[Middleware] No token, redirecting to signin');
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(signInUrl);
  }

  const userRole = token?.user?.role;
  console.log('[Middleware] User role:', userRole);

  if (!userRole) {
    console.log(
      '[Middleware] No role found in token, redirecting to dashboard with error'
    );
    const unauthorizedUrl = new URL('/dashboard', req.url);
    unauthorizedUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(unauthorizedUrl);
  }

  if (userRole === 'MASTER') {
    console.log('[Middleware] Role is MASTER, granting access');
    return NextResponse.next();
  }

  const routeConfig = roleBasedRoutes.find((route) =>
    pathname.startsWith(route.path)
  );

  console.log('[Middleware] Route config:', routeConfig);

  if (routeConfig && !routeConfig.roles.includes(userRole)) {
    console.log(
      '[Middleware] Role not allowed, redirecting to dashboard with error'
    );
    const unauthorizedUrl = new URL('/dashboard', req.url);
    unauthorizedUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(unauthorizedUrl);
  }

  console.log('[Middleware] Access granted');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
