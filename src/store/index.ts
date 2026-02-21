import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, CartItem, CandyProduct } from '@/types'


// ─── User Store ───────────────────────────────────────────────────────────────
interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  isAuthenticated: () => boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isAuthenticated: () => get().user !== null,
    }),
    { name: 'cp-user' }
  )
)

// ─── Cart Store ───────────────────────────────────────────────────────────────
interface CartState {
  items: CartItem[]
  addItem: (product: CandyProduct) => void
  removeItem: (productId: string) => void
  decrementItem: (productId: string) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

interface StoreState {
  // --- Estado del Usuario ---
  user: User | null
  setUser: (user: User | null) => void

  // --- Estado de la Dulcería (Carrito) ---
  cart: CartItem[]
  addToCart: (product: CandyProduct) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, delta: number) => void
  clearCart: () => void

  // --- Selectores Computados ---
  getTotalAmount: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items
        const existing = items.find((i) => i.product.id === product.id)
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },

      decrementItem: (productId) => {
        const items = get().items
        const existing = items.find((i) => i.product.id === productId)
        if (!existing) return
        if (existing.quantity === 1) {
          set({ items: items.filter((i) => i.product.id !== productId) })
        } else {
          set({
            items: items.map((i) =>
              i.product.id === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) })
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'cp-cart' }
  )
)

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Usuario capturado en Login
      user: null,
      setUser: (user) => set({ user }),

      // Carrito de compras para la Dulcería 
      cart: [],
      
      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find((item) => item.product.id === product.id)

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          })
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 } as any] })
        }
      },

      removeFromCart: (productId) =>
        set({ cart: get().cart.filter((item) => +item.product.id !== productId) }),

      updateQuantity: (productId, delta) => {
        const cart = get().cart
        set({
          cart: cart.map((item) => {
            if (+item.product.id === productId) {
              const newQty = Math.max(1, item.quantity + delta)
              return { ...item, quantity: newQty }
            }
            return item
          }),
        })
      },

      clearCart: () => set({ cart: [] }),

      // Cálculo del total para mostrar en Dulcería y Pago
      getTotalAmount: () => {
        return get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cineplanet-session-storage', // Nombre de la llave en localStorage
    }
  )
)
