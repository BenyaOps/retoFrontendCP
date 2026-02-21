import { useEffect, useState } from 'react'
import { Film } from 'lucide-react'
import { getPremieres } from '@/api/services'
import { MovieCard } from '@/components/home/MovieCard'
import type { Premiere } from '@/types'

export const HomePage = () => {
  const [premieres, setPremieres] = useState<Premiere[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPremieres()
      .then((res) => setPremieres(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-brand-400 font-bold animate-pulse uppercase tracking-widest text-xs">Sincronizando Cartelera</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center max-w-sm">
          <p className="text-red-400 font-bold">Error de conexión</p>
          <p className="text-gray-500 text-xs mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header — Estilo Cineplanet */}
      <header className="mb-12 relative">
        <div className="flex items-center gap-2 text-brand-500 text-xs font-black uppercase tracking-[0.2em] mb-3">
          <Film size={16} />
          <span>Experiencia Cineplanet</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
          Estrenos <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Exclusivos</span>
        </h1>
        <p className="text-gray-500 mt-4 text-base max-w-xl font-medium">
          Selecciona una película para comenzar tu proceso de compra.
        </p>
      </header>

      {/* Premiere list */}
      <div className="flex flex-col gap-8">
        {premieres.map((premiere, idx) => (
          <MovieCard 
            key={premiere.id} 
            premiere={premiere} 
            index={idx} 
          />
        ))}
      </div>
    </div>
  )
}