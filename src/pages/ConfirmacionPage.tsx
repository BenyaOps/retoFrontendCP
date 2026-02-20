import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { CheckCircle, Home, Film } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface LocationState {
  transactionId: string
  name: string
  email: string
  total: number
}

export const ConfirmacionPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  useEffect(() => {
    // If no state (direct nav), redirect to home
    if (!state) {
      navigate('/')
    }
  }, [state, navigate])

  if (!state) return null

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price)

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center animate-slide-up">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping" />
          </div>
        </div>

        <h1 className="font-display text-4xl font-bold text-white uppercase tracking-wide mb-2">
          ¡Compra exitosa!
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Tu pedido ha sido procesado correctamente
        </p>

        {/* Receipt card */}
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 text-left mb-6 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Nombre</span>
            <span className="text-white font-medium">{state.name}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Correo</span>
            <span className="text-white font-medium">{state.email}</span>
          </div>
          <div className="border-t border-dark-600 my-1" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">ID de transacción</span>
            <span className="text-gray-400 font-mono text-xs">
              {state.transactionId.slice(0, 12)}...
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Total pagado</span>
            <span className="text-brand-400 font-bold text-xl">
              {formatPrice(state.total)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-xs mb-8">
          Se enviará un comprobante a <span className="text-gray-400">{state.email}</span>
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            fullWidth
            className="gap-2"
          >
            <Home size={16} />
            Ir al inicio
          </Button>
          <Button
            onClick={() => navigate('/dulceria')}
            fullWidth
            className="gap-2"
          >
            <Film size={16} />
            Seguir comprando
          </Button>
        </div>
      </div>
    </div>
  )
}
