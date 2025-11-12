// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string | null
    name: string | null
    subscribed: boolean
    role: string | null  // این خط رو اضافه کن
  }

  interface Session {
    user: {
      id: string
      email: string | null
      name: string | null
      subscribed: boolean
      role: string | null  // اینم اضافه کن
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    subscribed: boolean
    role: string | null  // اینم اضافه کن
  }
}