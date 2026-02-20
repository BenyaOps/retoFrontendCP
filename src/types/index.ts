// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  name: string
  email: string
  isGuest: boolean
}

// ─── Premieres (Home) ─────────────────────────────────────────────────────────
export interface Premiere {
  id: string
  imageUrl: string
  title: string
  description: string
  genre: string
  duration: string
  rating: string
}

export interface PremieresResponse {
  data: Premiere[]
}

// ─── Candy Store (Dulcería) ───────────────────────────────────────────────────
export interface CandyProduct {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: 'snack' | 'drink' | 'combo'
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: 'snack' | 'drink' | 'combo'
}

export interface CandyStoreResponse {
  data: CandyProduct[]
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: CandyProduct
  quantity: number
}

// ─── Payment ─────────────────────────────────────────────────────────────────
export type DocumentType = 'DNI' | 'CE' | 'RUC' | 'PASAPORTE'

export interface PaymentFormData {
  cardNumber: string
  expirationDate: string
  cvv: string
  email: string
  name: string
  documentType: DocumentType
  documentNumber: string
}

// ─── PayU (simulated) ─────────────────────────────────────────────────────────
export interface PayUResponse {
  code: string
  transactionalCode: string
  transactionResponse: {
    orderId: number
    transactionId: string
    state: 'APPROVED' | 'DECLINED' | 'ERROR' | 'PENDING'
    paymentNetworkResponseCode: string
    paymentNetworkResponseErrorMessage: string | null
    trazabilityCode: string
    responseCode: string
    operationDate: string
  }
}

export interface PayURequest {
  cardNumber: string
  expirationDate: string
  cvv: string
  amount: number
  currency: string
  description: string
  buyer: {
    email: string
    fullName: string
    dniNumber: string
  }
}

export interface formDataPayment {
  cardNumber: string
  expirationDate: string
  cvv: string
  email: string
  name: string
  documentType: DocumentType
  documentNumber: string
}

// ─── Complete Transaction ─────────────────────────────────────────────────────
export interface CompletePayload {
  email: string
  name: string
  documentNumber: string
  operationDate: string
  transactionId: string
}

export interface CompleteResponse {
  code: string
  message: string
}

export interface Movie {
  id: string
  title: string
  description: string
  genre: string
  duration: string
  rating: string
  imageUrl: string
}