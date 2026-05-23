import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isLogin = req.nextUrl.pathname.startsWith('/login');

  if (!token && !isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('expired', '1');
    return NextResponse.redirect(url);
  }

  if (token && isLogin) {
    return NextResponse.redirect(new URL('/charges', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/charges/:path*', '/login']
};
