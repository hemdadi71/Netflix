import dbConnect from '@/app/libs/dbConenct'
import User from '@/app/model/User'
import bcrypt from 'bcrypt'
import prismadb from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 })
    }
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return new NextResponse('Email taken', { status: 422 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
