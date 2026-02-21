import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCandyStore } from '@/api/services'
import { useCartStore, useUserStore } from '@/store'
import type { CandyProduct } from '@/types'
import { Sidebar } from '@/components/dulceria/Sidebar'
import { Categories } from '@/components/dulceria/Categories'
import { GridProducts } from '@/components/grid/GridProducts'

export const DulceriaPage = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()
  // const { items, addItem, decrementItem, removeItem } = useCartStore()
  const { items } = useCartStore()
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
          <Categories 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          />

          {/* Products grid */}
          <GridProducts
            filtered={filtered}
            getItemQty={getItemQty}
            formatPrice={formatPrice}
          />
        </div>

        {/* Cart sidebar */}
        <Sidebar />
      </div>
    </div>
  )
}
