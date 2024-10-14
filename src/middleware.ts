import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const token = request.cookies.get('token')
  const role = request.cookies.get('role')
  const { pathname } = request.nextUrl

  const requiresAuth = ['/dashboard', '/checkout', '/reservations']

  // Redirect if trying to access login page while already authenticated
  if (pathname.startsWith('/login') && token) {
    if (role?.value === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Redirect to login if not authenticated and trying to access protected routes
  if (requiresAuth.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}
