import { apiClient } from './client'
import type {
  PremieresResponse,
  CandyStoreResponse,
  CompletePayload,
  CompleteResponse,
  PayUResponse,
  PaymentFormData,
} from '@/types'

// ─── Premieres ────────────────────────────────────────────────────────────────
export const getPremieres = async (): Promise<PremieresResponse> => {
  const { data } = await apiClient.get<PremieresResponse>('/premieres')
  return data
}

// ─── Candy Store ──────────────────────────────────────────────────────────────
export const getCandyStore = async (): Promise<CandyStoreResponse> => {
  const { data } = await apiClient.get<CandyStoreResponse>('/candystore')
  return data
}

// ─── PayU (Simulated sandbox) ─────────────────────────────────────────────────
// Per the challenge: simulate payment if PayU sandbox isn't accessible
export const processPayment = async (
  formData: PaymentFormData,
  totalAmount: number
): Promise<PayUResponse> => {
  const { data } = await apiClient.post<PayUResponse>('/payu/payment', {
    cardNumber: formData.cardNumber,
    expirationDate: formData.expirationDate,
    cvv: formData.cvv,
    amount: totalAmount,
    currency: 'PEN',
    description: 'Compra Cineplanet Dulcería',
    buyer: {
      email: formData.email,
      fullName: formData.name,
      dniNumber: formData.documentNumber,
    },
  })
  return data
}

// ─── Complete Transaction ─────────────────────────────────────────────────────
export const completeTransaction = async (
  payload: CompletePayload
): Promise<CompleteResponse> => {
  const { data } = await apiClient.post<CompleteResponse>('/complete', payload)
  return data
}
