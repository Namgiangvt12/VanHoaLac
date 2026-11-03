import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  if (host.startsWith('www.')) {
    const newHost = host.replace(/^www\./, '')
    const newUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${newHost}`)
    return NextResponse.redirect(newUrl, 301)
  }

  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authSession = request.cookies.get('admin_session')
    if (authSession?.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
}

