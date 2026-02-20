import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreditCard, Lock, ShoppingBag } from 'lucide-react'
import { processPayment, completeTransaction } from '@/api/services'
import { useUserStore, useCartStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import type { PaymentFormData } from '@/types'

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Número de tarjeta requerido')
    .regex(/^\d{16}$/, 'Debe tener exactamente 16 dígitos'),
  expirationDate: z
    .string()
    .min(1, 'Fecha requerida')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato MM/AA'),
  cvv: z
    .string()
    .min(1, 'CVV requerido')
    .regex(/^\d{3,4}$/, 'CVV de 3 o 4 dígitos'),
  email: z
    .string()
    .min(1, 'Correo requerido')
    .email('Correo electrónico inválido'),
  name: z
    .string()
    .min(3, 'Nombre debe tener al menos 3 caracteres')
    .max(100, 'Nombre muy largo'),
  documentType: z.enum(['DNI', 'CE', 'RUC', 'PASAPORTE']),
  documentNumber: z
    .string()
    .min(8, 'Número de documento muy corto')
    .max(20, 'Número de documento muy largo')
    .regex(/^[a-zA-Z0-9]+$/, 'Solo letras y números'),
})

const DOC_TYPE_OPTIONS = [
  { value: 'DNI', label: 'DNI' },
  { value: 'CE', label: 'Carné de Extranjería' },
  { value: 'RUC', label: 'RUC' },
  { value: 'PASAPORTE', label: 'Pasaporte' },
]

// Format card number with spaces
const formatCardNumber = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 16)
}

// Format expiration date
const formatExpiration = (value: string) => {
  const clean = value.replace(/\D/g, '').slice(0, 4)
  if (clean.length >= 2) return `${clean.slice(0, 2)}/${clean.slice(2)}`
  return clean
}

export const PagoPage = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const { items, total, clearCart } = useCartStore()

  const [loading, setLoading] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      documentType: 'DNI',
      email: user?.email ?? '',
      name: user && !user.isGuest ? user.name : '',
    },
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (items.length === 0) {
      navigate('/dulceria')
    }
  }, [user, items, navigate])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price)

  const onSubmit = async (formData: PaymentFormData) => {
    setLoading(true)
    try {
      // Step 1: Process payment with PayU (simulated)
      const payuResponse = await processPayment(formData, total())

      if (payuResponse.transactionResponse.state !== 'APPROVED') {
        throw new Error('La transacción fue rechazada. Verifica los datos de tu tarjeta.')
      }

      // Step 2: Complete transaction
      await completeTransaction({
        email: formData.email,
        name: formData.name,
        documentNumber: formData.documentNumber,
        operationDate: payuResponse.transactionResponse.operationDate,
        transactionId: payuResponse.transactionResponse.transactionId,
      })

      // Step 3: Clear cart and navigate to success
      clearCart()
      navigate('/confirmacion', {
        state: {
          transactionId: payuResponse.transactionResponse.transactionId,
          name: formData.name,
          email: formData.email,
          total: total(),
        },
      })
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error al procesar el pago')
      setErrorModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
            Pago
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Completa tus datos para finalizar la compra
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              {/* Card data */}
              <section className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard size={18} className="text-brand-400" />
                  <h2 className="font-semibold text-white">Datos de la tarjeta</h2>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Número de tarjeta"
                    placeholder="1234 5678 9012 3456"
                    error={errors.cardNumber?.message}
                    inputMode="numeric"
                    maxLength={16}
                    {...register('cardNumber', {
                      onChange: (e) => {
                        setValue('cardNumber', formatCardNumber(e.target.value))
                      },
                    })}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Fecha de expiración"
                      placeholder="MM/AA"
                      error={errors.expirationDate?.message}
                      maxLength={5}
                      {...register('expirationDate', {
                        onChange: (e) => {
                          setValue('expirationDate', formatExpiration(e.target.value))
                        },
                      })}
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      error={errors.cvv?.message}
                      hint="3 o 4 dígitos al dorso"
                      {...register('cvv')}
                    />
                  </div>
                </div>
              </section>

              {/* Personal data */}
              <section className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <ShoppingBag size={18} className="text-brand-400" />
                  <h2 className="font-semibold text-white">Datos personales</h2>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Nombre completo"
                    placeholder="Juan Pérez García"
                    error={errors.name?.message}
                    {...register('name')}
                  />

                  <Input
                    label="Correo electrónico"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Tipo de documento"
                      options={DOC_TYPE_OPTIONS}
                      error={errors.documentType?.message}
                      {...register('documentType')}
                    />
                    <Input
                      label="Número de documento"
                      placeholder="12345678"
                      inputMode="numeric"
                      error={errors.documentNumber?.message}
                      {...register('documentNumber')}
                    />
                  </div>
                </div>
              </section>

              {/* Security note */}
              <div className="flex items-center gap-2 text-xs text-gray-500 px-1">
                <Lock size={12} className="text-green-500" />
                <span>
                  Pago simulado seguro. No se procesará ningún cargo real.
                </span>
              </div>

              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
              >
                {loading ? 'Procesando pago...' : `Pagar ${formatPrice(total())}`}
              </Button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:w-72 shrink-0">
            <div className="sticky top-24 bg-dark-800 border border-dark-600 rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-4">Resumen del pedido</h2>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-400 truncate mr-2">
                      {item.quantity}× {item.product.name}
                    </span>
                    <span className="text-white shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dark-600 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Total a pagar</span>
                  <span className="font-bold text-xl text-brand-400">
                    {formatPrice(total())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <Modal
        isOpen={errorModal}
        onClose={() => setErrorModal(false)}
        title="Error en el pago"
        size="sm"
      >
        <div className="text-center py-2">
          <div className="text-4xl mb-3">❌</div>
          <p className="text-gray-300 text-sm">{errorMessage}</p>
          <Button
            onClick={() => setErrorModal(false)}
            className="mt-5"
            fullWidth
            variant="secondary"
          >
            Intentar nuevamente
          </Button>
        </div>
      </Modal>
    </>
  )
}
