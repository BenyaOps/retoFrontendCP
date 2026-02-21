import { NavLink, useNavigate } from 'react-router'
import { ShoppingCart, Film, LogOut, User } from 'lucide-react'
import { clsx } from 'clsx'
import { useUserStore, useCartStore } from '@/store'

export const Navbar = () => {
  const { user, clearUser } = useUserStore()
  const { itemCount, clearCart } = useCartStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearUser()
    clearCart()
    navigate('/')
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dulceria', label: 'Dulcería' },
    { to: '/login', label: 'Login' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <Film size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-widest uppercase">
              Cineplanet
            </span>
          </NavLink>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              if (to === '/login' && user) {
                // Si el usuario ya está logueado, no mostramos el enlace de login
                return null;
              }
              else if (to === '/dulceria' && !user) {
                // Si el usuario no está logueado, no mostramos el enlace de dulcería
                return null;
              }
              return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  clsx(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-brand-600/20 text-brand-400 border border-brand-600/30'
                      : 'text-gray-400 hover:text-white hover:bg-dark-700'
                  )
                }
              >
                {label}
              </NavLink>
            )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart icon */}
            <NavLink
              to="/dulceria"
              className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-all"
            >
              <ShoppingCart size={20} />
              {itemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {itemCount() > 9 ? '9+' : itemCount()}
                </span>
              )}
            </NavLink>

            {/* User info or login */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700 border border-dark-600">
                  <User size={14} className="text-brand-400" />
                  <span className="text-sm text-gray-300 max-w-[120px] truncate">
                    {user.isGuest ? 'Invitado' : user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-dark-700 transition-all"
                  title="Cerrar sesión"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Iniciar sesión
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-dark-700 px-4 py-2 flex gap-1">
        {navLinks.map(({ to, label }) => {
          if (to === '/login' && user) {
            // Si el usuario ya está logueado, no mostramos el enlace de login
            return null;
          }
          else if (to === '/dulceria' && !user) {
            // Si el usuario no está logueado, no mostramos el enlace de dulcería
            return null;
          }
              return (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              clsx(
                'flex-1 text-center px-3 py-2 rounded-lg text-xs font-medium transition-all',
                isActive
                  ? 'bg-brand-600/20 text-brand-400'
                  : 'text-gray-400 hover:text-white hover:bg-dark-700'
              )
            }
          >
            {label}
          </NavLink>
          )
        }
        )}
      </div>
    </header>
  )
}
