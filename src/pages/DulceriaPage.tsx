import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import { getCandyStore } from '@/api/services'
import { useCartStore, useUserStore } from '@/store'
import { Button } from '@/components/ui/Button'
import type { CandyProduct } from '@/types'

const CATEGORY_LABELS: Record<string, string> = {
  combo: 'Combos',
  snack: 'Snacks',
  drink: 'Bebidas',
}

export const DulceriaPage = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const { items, addItem, decrementItem, removeItem, total, itemCount } = useCartStore()

  const [products, setProducts] = useState<CandyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login')
      return
    }
    getCandyStore()
      .then((res) => setProducts(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user, navigate])

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))]

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  const getItemQty = (productId: string) =>
    items.find((i) => i.product.id === productId)?.quantity ?? 0

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price)

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Cargando dulcería...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 font-medium">Error al cargar la dulcería</p>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Products section */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
              Dulcería
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Complementa tu experiencia de cine
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 border border-dark-600'
                }`}
              >
                {cat === 'all' ? '🎬 Todos' : CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((product, idx) => {
              const qty = getItemQty(product.id)
              return (
                <div
                  key={product.id}
                  className="bg-dark-800 border border-dark-600 rounded-xl p-5 flex flex-col gap-3 hover:border-dark-500 transition-all animate-slide-up"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Product info */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-brand-400 font-bold text-sm shrink-0">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Add/remove controls */}
                  <div className="flex items-center gap-2 mt-auto">
                    {qty === 0 ? (
                      <Button
                        onClick={() => addItem(product)}
                        size="sm"
                        fullWidth
                        className="text-xs"
                      >
                        <Plus size={14} />
                        Agregar
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <button
                          onClick={() => decrementItem(product.id)}
                          className="w-8 h-8 rounded-lg bg-dark-600 hover:bg-dark-500 text-white flex items-center justify-center transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flex-1 text-center font-bold text-white text-sm">
                          {qty}
                        </span>
                        <button
                          onClick={() => addItem(product)}
                          className="w-8 h-8 rounded-lg bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="w-8 h-8 rounded-lg bg-dark-600 hover:bg-red-900/50 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cart sidebar */}
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
      </div>
    </div>
  )
}
