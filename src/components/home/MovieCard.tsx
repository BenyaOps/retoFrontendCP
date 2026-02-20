import { useNavigate } from 'react-router'
import { Clock, Star } from 'lucide-react'
import type { Premiere } from '@/types'

interface MovieCardProps {
  premiere: Premiere
  index: number
}

export const MovieCard = ({ premiere, index }: MovieCardProps) => {
  const navigate = useNavigate()

  const handleAction = () => navigate('/login')

  return (
    <article
      className="group flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden border border-dark-600 
                 hover:border-brand-600/50 transition-all duration-300 bg-dark-800 
                 hover:bg-dark-700 animate-slide-up"
      style={{ animationDelay: `${index * 60}ms` }}
      role="button"
      tabIndex={0}
      onClick={handleAction}
      onKeyDown={(e) => e.key === 'Enter' && handleAction()}
    >
      {/* Imagen — Lado Izquierdo [cite: 24] */}
      <div className="sm:w-48 lg:w-56 shrink-0 overflow-hidden relative">
        <img
          src={premiere.imageUrl}
          alt={premiere.title}
          className="w-full h-52 sm:h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              `https://placehold.co/400x600/1f1f1f/ff2b2b?text=${encodeURIComponent(premiere.title)}`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800/80 to-transparent sm:hidden" />
      </div>

      {/* Texto — Lado Derecho [cite: 24] */}
      <div className="flex flex-col justify-between p-6 flex-1">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-brand-600/20 text-brand-400 border border-brand-600/30">
              {premiere.genre}
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-dark-600 text-gray-400 border border-dark-500">
              {premiere.rating}
            </span>
          </div>

          <h2 className="font-display text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight group-hover:text-brand-400 transition-colors">
            {premiere.title}
          </h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-2 lg:line-clamp-3 font-light">
            {premiere.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-dark-600/50">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-500" />
              {premiere.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              En Cartelera
            </span>
          </div>
          <span className="text-brand-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
            COMPRAR <span className="text-lg">→</span>
          </span>
        </div>
      </div>
    </article>
  )
}