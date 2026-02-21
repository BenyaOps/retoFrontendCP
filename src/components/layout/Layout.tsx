import { Navbar } from './Navbar'
import { Outlet } from 'react-router'



export const Layout = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      <main className="pt-16 md:pt-16">
      <Outlet />
      </main>
    </div>
  )
}
