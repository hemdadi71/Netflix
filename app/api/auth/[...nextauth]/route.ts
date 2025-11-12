import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prismadb from '@/app/libs/prismadb'

export const authOptions: AuthOptions = {
  // adapter: حذف شد
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<any | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!isCorrect) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // این خط رو نگه دار
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth/signin',
  },

  // این callbackها رو اضافه کن (حتماً!)
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.subscribed = user.subscribed
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string
          session.user.subscribed = token.subscribed as boolean
          session.user.role = token.role
        }
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
