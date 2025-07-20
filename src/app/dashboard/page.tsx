import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import Navbar from './components/navbar'
import ProductList from './components/product-list'
import ProductSearchInput from './components/product-searchInput'

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect('/authentication')
  }

  const { name, email, id } = session.user

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar name={name} email={email} id={id}/>

      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo, {name}!</h1>
        <p className="mb-4">Aproveite nossos produtos</p>

        <ProductSearchInput />
        <ProductList currentUserId={session.user.id} />
      </main>
    </div>
  )
}

export default DashboardPage
