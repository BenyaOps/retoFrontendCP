import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/Button'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl font-bold text-brand-600/30">404</p>
        <h1 className="text-2xl font-bold text-white mt-4 mb-2">Página no encontrada</h1>
        <p className="text-gray-500 text-sm mb-6">
          La página que buscas no existe o fue movida.
        </p>
        <Button onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    </div>
  )
}
