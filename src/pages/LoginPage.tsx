import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { UserCircle2 } from 'lucide-react'
import { useUserStore } from '@/store'
import { authService } from '@/api/auth'
import { WelcomeModal } from '@/components/auth/WelcomeModal'

const loginSchema = z.object({
  email: z.string().email('Ingresa un correo válido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginPage = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)
  const [showWelcome, setShowWelcome] = useState(false)
  const [tempName, setTempName] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  // Validación de Usuario Logueado
  useEffect(() => {
    if (user) {
      navigate('/dulceria', { replace: true });
    }
  }, [user, navigate]);

  // Login tradicional (Email/Password)
  const onEmailLogin = async (data: LoginFormValues) => {
    try {
      const userData = await authService.loginWithEmail(data.email, data.password)
      setUser(userData)
      setTempName(userData.name)
      setShowWelcome(true)
    } catch (error) {
      alert("Error al iniciar sesión con correo y contraseña")
    }
  }

  // Login real con Firebase Google
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      const userData = await authService.loginWithGoogle()
      setUser(userData)
      setTempName(userData.name)
      setShowWelcome(true)
    } catch (error) {
      console.error(error)
      alert("Error al conectar con Google")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleGuestEntry = () => {
  // 1. Seteamos el estado global como invitado
  setUser({
    name: 'Invitado',
    email: '',
    isGuest: true, // Flag importante para la lógica de Pago
  });

  navigate('/dulceria');
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-dark-800 border border-dark-600 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white uppercase">Iniciar Sesión</h1>
        </div>

        {/* Formulario Tradicional */}
        <form onSubmit={handleSubmit(onEmailLogin)} className="space-y-4">
          <input {...register('email')} placeholder="Correo" className="form-input" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          
          <input {...register('password')} type="password" placeholder="Contraseña" className="form-input" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full btn-submit">
            {isSubmitting ? 'ENTRANDO...' : 'INGRESAR'}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <span className="bg-dark-800 px-2 text-xs text-gray-500 uppercase font-bold">o accede con</span>
        </div>

        {/* Botón de Google Corregido */}
        <button
          type="button"
          disabled={isGoogleLoading}
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-dark-950 font-black py-4 rounded-xl transition-all shadow-lg active:scale-95 mb-4"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
          {isGoogleLoading ? 'CONECTANDO...' : 'INGRESAR CON GOOGLE'}
        </button>

        <button
  type="button"
  onClick={handleGuestEntry}
  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl 
             border border-dark-600 bg-dark-700/50 text-gray-400 font-bold 
             hover:bg-dark-700 hover:text-white hover:border-brand-500/50 
             transition-all duration-300 active:scale-[0.98] group"
>
  <UserCircle2 size={20} className="group-hover:text-brand-500 transition-colors" />
  CONTINUAR COMO INVITADO
</button>
      </div>

      {showWelcome && (
        <WelcomeModal 
          name={tempName} 
          onConfirm={() => {
            console.log("Navegando a dulcería..."); // Debug
            navigate('/dulceria');
          }} 
        />
      )}
    </div>
  )
}