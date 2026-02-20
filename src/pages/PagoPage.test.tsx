import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

vi.spyOn(console, 'log').mockImplementation(() => {})

const hooks = vi.hoisted(() => {
  return {
    wrapUseState: false,
    useStateCallIndex: 0,
    callOrder: [] as string[],
  }
})

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')

  return {
    ...actual,
    useState: (initial: any) => {
      const [value, setValue] = actual.useState(initial)

      if (!hooks.wrapUseState) return [value, setValue]

      hooks.useStateCallIndex += 1

      // PagoPage's 2nd useState call is `showSuccess`
      if (hooks.useStateCallIndex === 2) {
        const wrappedSetValue = (next: any) => {
          hooks.callOrder.push('setShowSuccess')
          return (setValue as any)(next)
        }
        return [value, wrappedSetValue]
      }

      return [value, setValue]
    },
  }
})

const mocks = vi.hoisted(() => {
  return {
    navigate: vi.fn(),
    processPayment: vi.fn(),
    completeTransaction: vi.fn(),
    useCartStore: vi.fn(),
  }
})

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  }
})

vi.mock('@/components/pago/OrderSummary', () => ({
  OrderSummary: () => <div data-testid="order-summary" />,
}))

vi.mock('@/components/pago/PaymentSuccessModal', () => ({
  PaymentSuccessModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="success-modal" /> : null,
}))

vi.mock('@/components/pago/PaymentForm', () => ({
  PaymentForm: ({ onSubmit, isProcessing }: { onSubmit: (data: any) => Promise<void>; isProcessing: boolean }) => (
    <button
      type="button"
      data-testid="submit-payment"
      disabled={isProcessing}
      onClick={() =>
        onSubmit({
          cardNumber: '4111111111111111',
          expiry: '12/30',
          cvv: '123',
          email: 'test@example.com',
          name: 'Test User',
          docType: 'DNI',
          docNumber: '12345678',
        })
      }
    >
      Submit Payment
    </button>
  ),
}))

vi.mock('@/components/pagos/itemsVacio', () => ({
  ItemsVacio: () => <div data-testid="items-vacio" />,
}))

vi.mock('@/api/services', () => ({
  payuService: {
    processPayment: mocks.processPayment,
  },
  cinemaApi: {
    completeTransaction: mocks.completeTransaction,
  },
}))

vi.mock('@/store', () => ({
  useCartStore: mocks.useCartStore,
}))

import { PagoPage } from './PagoPage'

describe('PagoPage', () => {
  beforeEach(() => {
    mocks.navigate.mockReset()
    mocks.processPayment.mockReset()
    mocks.completeTransaction.mockReset()
    mocks.useCartStore.mockReset()
  })

  it('displays ItemsVacio when the cart is empty and success has not been shown', () => {
    const clearCart = vi.fn()

    mocks.useCartStore.mockImplementation((selector?: (state: any) => any) => {
      const state = { items: [], clearCart }
      return selector ? selector(state) : state
    })

    render(<PagoPage />)
    expect(screen.getByTestId('items-vacio')).toBeInTheDocument()
  })

  it('does not initiate payment processing if the cart is empty', () => {
    const clearCart = vi.fn()

    mocks.useCartStore.mockImplementation((selector?: (state: any) => any) => {
      const state = { items: [], clearCart }
      return selector ? selector(state) : state
    })

    render(<PagoPage />)

    expect(screen.queryByTestId('submit-payment')).not.toBeInTheDocument()
    expect(mocks.processPayment).not.toHaveBeenCalled()
    expect(mocks.completeTransaction).not.toHaveBeenCalled()
  })

  it('calls clearCart after setShowSuccess in the successful payment flow', async () => {
    const user = userEvent.setup()

    hooks.wrapUseState = true
    hooks.useStateCallIndex = 0
    hooks.callOrder.length = 0

    const clearCart = vi.fn(() => {
      hooks.callOrder.push('clearCart')
    })

    mocks.useCartStore.mockImplementation((selector?: (state: any) => any) => {
      const state = {
        items: [{ product: { id: '1', name: 'Popcorn', price: 10 }, quantity: 1 }],
        clearCart,
      }
      return selector ? selector(state) : state
    })

    mocks.processPayment.mockResolvedValue({
      operationDate: '2026-02-20T00:00:00.000Z',
      transactionId: 'TX-123',
    })

    mocks.completeTransaction.mockResolvedValue({ code: '0' })

    render(<PagoPage />)

    await user.click(screen.getByTestId('submit-payment'))

    await waitFor(() => {
      expect(mocks.processPayment).toHaveBeenCalledTimes(1)
      expect(mocks.completeTransaction).toHaveBeenCalledTimes(1)
      expect(clearCart).toHaveBeenCalledTimes(1)
    })

    hooks.wrapUseState = false

    expect(hooks.callOrder.indexOf('setShowSuccess')).toBeGreaterThanOrEqual(0)
    expect(hooks.callOrder.indexOf('clearCart')).toBeGreaterThanOrEqual(0)
    expect(hooks.callOrder.indexOf('setShowSuccess')).toBeLessThan(
      hooks.callOrder.indexOf('clearCart')
    )
  })
})
