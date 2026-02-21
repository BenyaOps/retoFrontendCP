
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store';
import { Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {
  const navigate = useNavigate()
      const { items, total, itemCount } = useCartStore()
      const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price)
    
      return (
        <div className="lg:w-80 shrink-0">
          <div className="sticky top-24">
            <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <ShoppingCart size={18} className="text-brand-400" />
                <h2 className="font-semibold text-white">
                  Tu pedido
                  {itemCount() > 0 && (
                    <span className="ml-2 text-xs text-gray-400">
                      ({itemCount()} {itemCount() === 1 ? 'producto' : 'productos'})
                    </span>
                  )}
                </h2>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-3xl mb-2">🍿</p>
                  <p className="text-gray-500 text-sm">Tu carrito está vacío</p>
                  <p className="text-gray-600 text-xs mt-1">
                    Agrega productos para continuar
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{item.product.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-brand-400 shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dark-600 my-4" />

                  {/* Total */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-semibold text-white">Total</span>
                    <span className="font-bold text-xl text-brand-400">
                      {formatPrice(total())}
                    </span>
                  </div>

                  <Button
                    onClick={() => navigate('/pago')}
                    fullWidth
                    size="lg"
                    className="gap-2"
                  >
                    Continuar
                    <ArrowRight size={16} />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
    )
}