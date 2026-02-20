import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Film, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useUserStore } from '@/store'

// Google icon SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
)

// Simulated Google users pool
const MOCK_GOOGLE_USERS = [
  { name: 'Ana García', email: 'ana.garcia@gmail.com' },
  { name: 'Carlos Pérez', email: 'carlos.perez@gmail.com' },
  { name: 'María Torres', email: 'maria.torres@gmail.com' },
]

export const LoginPage = () => {
  const navigate = useNavigate()
  const { setUser } = useUserStore()

  const [googleLoading, setGoogleLoading] = useState(false)
  const [welcomeModal, setWelcomeModal] = useState(false)
  const [loggedUser, setLoggedUser] = useState<{ name: string; email: string } | null>(null)

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    // Simulate Google OAuth flow (1.5s)
    await new Promise((r) => setTimeout(r, 1500))

    const mockUser = MOCK_GOOGLE_USERS[Math.floor(Math.random() * MOCK_GOOGLE_USERS.length)]
    setLoggedUser(mockUser)
    setUser({ ...mockUser, isGuest: false })
    setGoogleLoading(false)
    setWelcomeModal(true)
  }

  const handleGuest = () => {
    setUser({ name: 'Invitado', email: '', isGuest: true })
    navigate('/dulceria')
  }

  const handleAcceptWelcome = () => {
    setWelcomeModal(false)
    navigate('/dulceria')
  }

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md animate-slide-up">
          {/* Card */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-600/10 border border-brand-600/20 rounded-2xl mb-4">
                <Film size={24} className="text-brand-400" />
              </div>
              <h1 className="font-display text-3xl font-bold text-white uppercase tracking-wide">
                Iniciar Sesión
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Elige cómo quieres continuar tu compra
              </p>
            </div>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mb-3"
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {googleLoading ? 'Conectando con Google...' : 'Continuar con Google'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-dark-600" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">o</span>
              <div className="flex-1 h-px bg-dark-600" />
            </div>

            {/* Guest Button */}
            <button
              onClick={handleGuest}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-dark-500 bg-dark-700 hover:bg-dark-600 hover:border-dark-400 text-gray-300 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              <User size={16} />
              Continuar como Invitado
            </button>

            {/* Info */}
            <p className="text-center text-xs text-gray-600 mt-6">
              Al iniciar sesión con Google, tu nombre y correo se usarán para completar tu compra de forma automática.
            </p>
          </div>

          {/* Security note */}
          <p className="text-center text-xs text-gray-600 mt-4">
            🔒 Tus datos están protegidos con cifrado SSL
          </p>
        </div>
      </div>

      {/* Welcome Modal */}
      <Modal
        isOpen={welcomeModal}
        onClose={handleAcceptWelcome}
        title="¡Bienvenido!"
        closable={false}
        size="sm"
      >
        <div className="text-center py-2">
          <div className="w-16 h-16 bg-brand-600/10 border border-brand-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👋</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            ¡Hola, {loggedUser?.name?.split(' ')[0]}!
          </h3>
          <p className="text-gray-400 text-sm mb-1">
            Has iniciado sesión correctamente.
          </p>
          <p className="text-gray-500 text-xs mb-6">
            {loggedUser?.email}
          </p>
          <Button onClick={handleAcceptWelcome} fullWidth size="lg">
            Aceptar
          </Button>
        </div>
      </Modal>
    </>
  )
}
