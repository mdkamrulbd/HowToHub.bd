import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const role = user?.user_metadata?.role as string | undefined

  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin' && !user) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (request.nextUrl.pathname === '/admin' && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  if (user && role === 'manager' && request.nextUrl.pathname.startsWith('/admin')) {
    const pathname = request.nextUrl.pathname
    const allowedPrefixes = ['/admin/dashboard', '/admin/posts', '/admin/ads']
    const isAllowed = allowedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
    if (!isAllowed) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return response
}
