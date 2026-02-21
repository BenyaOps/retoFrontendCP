import axios from 'axios';
import { apiClient } from './client'
import type {
  PremieresResponse,
  CandyStoreResponse,
  CompletePayload,
  CompleteResponse,
  PayUResponse,
  PaymentFormData,
  Premiere, Product,
} from '@/types'

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://o43w8mr1b9.execute-api.us-east-1.amazonaws.com/dev/api',
  headers: { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' }
});

/**
 * Servicio de PayU Latam (Simulado/Real)
 * Requerimiento: Integración con API de pagos Perú
 */
export const payuService = {
  processPayment: async (paymentData: any): Promise<PayUResponse> => {
    // En una implementación real, aquí se llamaría al endpoint de PayU 
    // Por requerimiento del reto, podemos simular el pago exitoso
    console.log({paymentData});
    
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      // Valores requeridos para el servicio 'complete' posterior 
      operationDate: new Date().toISOString(),
      transactionId: `PAYU-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      code: "0", // Código de éxito simulado
      transactionalCode: "APPROVED"
    };
  }
};

/**
 * Servicios core de Cineplanet
 */
export const cinemaApi = {
  // 1. Obtener cartelera (Imágenes y textos)
  getPremieres: () => api.get<Premiere[]>('/premieres'),

  // 2. Obtener dulcería (Nombre, descripción y precio)
  getCandystore: () => api.get<Product[]>('/candystore'),

  // 3. Finalizar transacción (Servicio Complete)
  completeTransaction: async (data: {
    email: string;      
    nombres: string;  
    dni: string;        
    operationDate: string; 
    transactionId: string; 
  }) => {
    // El servicio complete debe retornar un código de respuesta "0" 
    const response = await api.post<{ code: string }>('/complete', data);
    return response.data;
  }
};

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


