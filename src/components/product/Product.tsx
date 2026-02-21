import { Button } from '@/components/ui/Button'
import { Plus, Minus, Trash2 } from 'lucide-react'

type ProductProps = {
    product: any,
    idx: number,
    price: number | string,
    handleDecrement: (productId: string) => void,
    handleIncrement: (productId: string) => void,
    handleRemove: (productId: string) => void,
    qty: number
}

export const Product = ({ product, idx, price, handleDecrement, handleIncrement, handleRemove, qty }: ProductProps) => {

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
                {price}
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
                onClick={() => handleIncrement(product)}
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
                    onClick={() => handleDecrement(product.id)}
                    className="w-8 h-8 rounded-lg bg-dark-600 hover:bg-dark-500 text-white flex items-center justify-center transition-colors"
                >
                    <Minus size={14} />
                </button>
                <span className="flex-1 text-center font-bold text-white text-sm">
                    {qty}
                </span>
                <button
                    onClick={() => handleIncrement(product)}
                    className="w-8 h-8 rounded-lg bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center transition-colors"
                >
                    <Plus size={14} />
                </button>
                <button
                    onClick={() => handleRemove(product.id)}
                    className="w-8 h-8 rounded-lg bg-dark-600 hover:bg-red-900/50 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors"
                >
                    <Trash2 size={13} />
                </button>
                </div>
            )}
            </div>
        </div>
    )
}