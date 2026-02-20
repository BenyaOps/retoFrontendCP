import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { LogIn, UserCircle2 } from 'lucide-react'
import { useStore } from '@/store'
import { WelcomeModal } from '@/components/auth/WelcomeModal'

// Esquema de validación para cumplir con el requerimiento 
const loginSchema = z.object({
  email: z.string().email('Ingresa un correo de Google válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginPage = () => {
  const navigate = useNavigate()
  const setUser = useStore((state) => state.setUser)
  const [showWelcome, setShowWelcome] = useState(false)
  const [tempName, setTempName] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  // Manejo de Login con Google [cite: 26, 27]
  const onGoogleLogin = (data: LoginFormValues) => {
    const nameFromEmail = data.email.split('@')[0]
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
    
    // Guardamos los datos para usarlos en la pantalla de Pago 
    setUser({
      name: capitalizedName,
      email: data.email,
      isGuest: false,
    })
    
    setTempName(capitalizedName)
    setShowWelcome(true) // Activamos el pop-up de bienvenida 
  }

  // Manejo de ingreso como Invitado 
  const handleGuestEntry = () => {
    setUser({
      name: 'Invitado',
      email: '',
      isGuest: true,
    })
    navigate('/dulceria')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-dark-800 border border-dark-600 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-600/10 text-brand-500 mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Iniciar Sesión</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Elige tu forma de ingreso para comprar</p>
        </div>

        <form onSubmit={handleSubmit(onGoogleLogin)} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Correo de Google</label>
            <input
              {...register('email')}
              type="email"
              placeholder="ejemplo@gmail.com"
              className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
            />
            {errors.email && <p className="text-red-500 text-xs font-medium ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
            />
            {errors.password && <p className="text-red-500 text-xs font-medium ml-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-brand-800 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-brand-600/20 active:scale-[0.98]"
          >
            {isSubmitting ? 'VERIFICANDO...' : 'INGRESAR CON GOOGLE'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-dark-600"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="px-4 bg-dark-800 text-gray-500 font-bold">O continúa como</span></div>
        </div>

        <button
          onClick={handleGuestEntry}
          className="w-full flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-gray-300 font-bold py-4 rounded-xl border border-dark-500 transition-all active:scale-[0.98]"
        >
          <UserCircle2 size={20} />
          INVITADO
        </button>
      </div>

      {showWelcome && (
        <WelcomeModal 
          name={tempName} 
          onConfirm={() => navigate('/dulceria')} 
        />
      )}
    </div>
  )
}