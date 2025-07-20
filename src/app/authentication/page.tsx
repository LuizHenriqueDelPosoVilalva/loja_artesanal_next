import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import LoginForm from './components/login-form'

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-[400px] space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <LoginForm />
        <p className="text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Crie uma agora
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthenticationPage
