import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth',
  },
})

export const config = {
  matcher: [
    '/profiles/:path*',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}
