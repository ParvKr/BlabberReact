import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAuth = await getToken({ req })

  // "/" (landing) and "/login" are public, but signed-in users skip them
  if (pathname === '/' || pathname.startsWith('/login')) {
    return isAuth
      ? NextResponse.redirect(new URL('/dashboard', req.url))
      : NextResponse.next()
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
}
