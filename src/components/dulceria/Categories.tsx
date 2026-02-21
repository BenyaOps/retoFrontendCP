type IProps = {
    categories: string[]
    activeCategory: string
    setActiveCategory: (cat: string) => void
}

export const Categories = ({categories, activeCategory, setActiveCategory}: IProps) =>   { 
    const CATEGORY_LABELS: Record<string, string> = {
        combo: 'Combos',
        snack: 'Snacks',
        drink: 'Bebidas',
    }
    return (
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
    )
}