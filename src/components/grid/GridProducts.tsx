
import type { CandyProduct } from '@/types'
import { useCartStore } from '@/store'
import { Product } from '../product/Product'


type GridProductsProps = {
    filtered: CandyProduct[],
    getItemQty: (productId: string) => number,
    formatPrice: (price: number) => string
}

export const GridProducts = ({ filtered, getItemQty, formatPrice }: GridProductsProps) => {
    const { addItem, decrementItem, removeItem } = useCartStore()
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((product, idx) => {
              const qty = getItemQty(product.id)
              return (
                <Product
                  key={product.id}
                  product={product}
                  idx={idx}
                  price={formatPrice(product.price)}
                  qty={qty}
                  handleIncrement={() => addItem(product)}
                  handleDecrement={() => decrementItem(product.id)}
                  handleRemove={() => removeItem(product.id)}
                />
              )
            })}
          </div>
    )
}