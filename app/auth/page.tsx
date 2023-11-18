'use client'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import Button from '@/app/components/Button'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import Input from '../components/inputs/Input'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Alert from '../components/Alert'
type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const pathName = usePathname()
  const [showAlert, setShowAlert] = useState(false)
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/profiles')
    }
    setShowAlert(true)
    const timeoutId = setTimeout(() => {
      setShowAlert(false)
    }, 20000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [session?.status, router, session?.data?.user?.role, pathName])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .then(callback => {
          if (callback?.error) {
            toast.error('Invalid credentials!')
          }

          if (callback?.ok) {
            router.push('/profiles')
            toast.success(`Wellcome 👋`)
          }
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then(callback => {
          console.log(callback)
          if (callback?.error) {
            return toast.error('Invalid credentials!')
          }

          if (callback?.ok) {
            router.push('/profiles')
            toast.success(`Wellcome 👋`)
          }
        })
        .finally(() => setIsLoading(false))
    }
  }
  return (
    <>
      <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <Image
              src={'/images/logo.png'}
              width={192}
              height={48}
              alt="Logo"
            />
          </nav>
          <div className="flex justify-center">
            <form
              className="bg-black bg-opacity-70 mx-4 flex flex-col gap-3 md:gap-0 md:mx-0 2xl:p-14 md:p-10 self-center lg:w-2/5 lg:max-w-md rounded-md w-full"
              onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-white text-4xl 2xl:mb-8 md:mb-6 font-semibold">
                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === 'REGISTER' && (
                  <Input
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    id="name"
                    label="Name"
                    pattern={/([a-zA-Z]{2}|[^0-9]{2}|\D{2}|[^\d]{2})/}
                    text="Enter valid name"
                  />
                )}
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id="email"
                  label="Email address"
                  type="text"
                  pattern={/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/}
                  text="Example@gmail.com"
                />
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id="password"
                  label="Password"
                  type="password"
                  pattern={/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/}
                  text="Password must be at least 8 characters and one uppercase letter and one number"
                />
              </div>

              <Button
                className="2xl:mt-10 md:mt-6"
                type="submit"
                isLoading={isLoading}>
                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button>

              <p className="text-neutral-500 2xl:mt-12 md:mt-3">
                {variant === 'LOGIN'
                  ? 'First time useing Netflix?'
                  : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer">
                  {variant === 'LOGIN' ? 'Create an accound' : 'Login'}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      {showAlert && <Alert setShowAlert={setShowAlert} />}
    </>
  )
}

export default AuthForm
