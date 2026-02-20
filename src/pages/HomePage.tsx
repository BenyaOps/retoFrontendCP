import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Film, Clock, Star } from 'lucide-react'
import { getPremieres } from '@/api/services'
import type { Premiere } from '@/types'

export const HomePage = () => {
  const [premieres, setPremieres] = useState<Premiere[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getPremieres()
      .then((res) => setPremieres(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Cargando cartelera...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 font-medium">Error al cargar los estrenos</p>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-brand-400 text-sm font-medium uppercase tracking-wider mb-2">
          <Film size={14} />
          <span>Cartelera 2024</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
          Estrenos de la semana
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Selecciona una película para comenzar tu compra
        </p>
      </div>

      {/* Premiere list */}
      <div className="space-y-6">
        {premieres.map((premiere, idx) => (
          <article
            key={premiere.id}
            className="group flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden border border-dark-600 hover:border-brand-600/50 transition-all duration-300 cursor-pointer bg-dark-800 hover:bg-dark-700 animate-slide-up"
            style={{ animationDelay: `${idx * 60}ms` }}
            onClick={() => navigate('/login')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/login')}
          >
            {/* Image — left side */}
            <div className="sm:w-48 lg:w-56 shrink-0 overflow-hidden">
              <img
                src={premiere.imageUrl}
                alt={premiere.title}
                className="w-full h-52 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    `https://placehold.co/400x600/1f1f1f/ff2b2b?text=${encodeURIComponent(premiere.title)}`
                }}
              />
            </div>

            {/* Text — right side */}
            <div className="flex flex-col justify-between p-5 flex-1">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-600/20 text-brand-400 border border-brand-600/30">
                    {premiere.genre}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-dark-600 text-gray-300 border border-dark-500">
                    {premiere.rating}
                  </span>
                </div>

                <h2 className="font-display text-2xl lg:text-3xl font-bold text-white uppercase tracking-wide group-hover:text-brand-300 transition-colors">
                  {premiere.title}
                </h2>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">
                  {premiere.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {premiere.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" />
                    En cartelera
                  </span>
                </div>
                <span className="text-brand-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  Comprar →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
