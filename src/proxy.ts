import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const protectedRoutes = ['/i'];

const publicRoutes = ['/auth'];

const isMiddlewareDisabled = process.env.DISABLE_MIDDLEWARE === 'true';



function isAuthenticated(request: NextRequest): boolean {
  const refreshToken = request.cookies.get('refreshToken');
  return !!refreshToken?.value;
}


function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}


function isPublicAuthRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname.startsWith(route));
}

export function proxy(request: NextRequest) {

  if (isMiddlewareDisabled) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isAuth = isAuthenticated(request);
  const isProtected = isProtectedRoute(pathname);
  const isPublicAuth = isPublicAuthRoute(pathname);
  const isRoot = pathname === '/';

  if (isRoot) {
    const url = request.nextUrl.clone();
    url.pathname = isAuth ? '/i' : '/auth/welcome';
    return NextResponse.redirect(url);
  }

  if (isAuth && isPublicAuth && pathname !== '/auth/register') {
    const url = request.nextUrl.clone();
    url.pathname = '/i';
    return NextResponse.redirect(url);
  }

  if (!isAuth && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
