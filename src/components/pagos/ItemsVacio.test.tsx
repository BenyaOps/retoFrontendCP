import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ItemsVacio } from '@/components/pagos/itemsVacio'

describe('ItemsVacio', () => {
  it('renders the empty cart message and navigation button', () => {
    render(
      <MemoryRouter initialEntries={['/pago']}>
        <ItemsVacio />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /tu carrito está/i })).toBeInTheDocument()
    expect(
      screen.getByText(/necesitas productos en tu pedido para proceder al pago/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /volver a la dulcería/i })
    ).toBeInTheDocument()
  })

  it('navigates to "/dulceria" when clicking the navigation button', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/pago']}>
        <Routes>
          <Route path="/pago" element={<ItemsVacio />} />
          <Route path="/dulceria" element={<div>Dulceria Route</div>} />
        </Routes>
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /volver a la dulcería/i }))
    expect(screen.getByText('Dulceria Route')).toBeInTheDocument()
  })
})
