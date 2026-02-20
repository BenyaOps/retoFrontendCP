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
