import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const ItemsVacio = () => {

    const navigate = useNavigate();

  return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          {/* Icono de estado vacío con estilo Cine */}
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto border border-dark-600">
              <ShoppingBag size={40} className="text-gray-600" />
            </div>
            <span className="absolute -top-1 -right-1 text-3xl">🍿</span>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Tu carrito está <span className="text-brand-500">vacío</span>
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Parece que aún no has seleccionado tus snacks para la función. 
              Necesitas productos en tu pedido para proceder al pago.
            </p>
          </div>

          <Button 
            onClick={() => navigate('/dulceria')}
            fullWidth
            className="h-14 rounded-xl font-black uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a la Dulcería
          </Button>
        </div>
      </div>
    );
}