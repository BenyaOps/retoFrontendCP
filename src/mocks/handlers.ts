import { http, HttpResponse } from 'msw'
import type {
  PremieresResponse,
  CandyStoreResponse,
  PayUResponse,
  CompleteResponse,
} from '@/types'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PREMIERES_MOCK: PremieresResponse = {
  data: [
    {
      id: '1',
      imageUrl: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      title: 'Deadpool & Wolverine',
      description:
        'Deadpool y Wolverine unen fuerzas en una aventura que cambiará el multiverso para siempre. La película más esperada del año con Hugh Jackman y Ryan Reynolds.',
      genre: 'Acción / Comedia',
      duration: '127 min',
      rating: '+18',
    },
    {
      id: '2',
      imageUrl: 'https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg',
      title: 'Inside Out 2',
      description:
        'Riley entra a la adolescencia y nuevas emociones irrumpen en la sede central, poniendo en peligro todo lo que las emociones originales construyeron.',
      genre: 'Animación / Familiar',
      duration: '100 min',
      rating: 'APT',
    },
    {
      id: '3',
      imageUrl: 'https://image.tmdb.org/t/p/w500/mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg',
      title: 'A Quiet Place: Día Uno',
      description:
        'El origen de la invasión alienígena que dejó al mundo en silencio. Una nueva historia de supervivencia en la ciudad de Nueva York.',
      genre: 'Terror / Ciencia Ficción',
      duration: '99 min',
      rating: '+14',
    },
    {
      id: '4',
      imageUrl: 'https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg',
      title: 'Alien: Romulus',
      description:
        'Un grupo de colonizadores espaciales se enfrenta a la forma de vida más aterradora del universo mientras exploran una estación espacial abandonada.',
      genre: 'Terror / Ciencia Ficción',
      duration: '119 min',
      rating: 'M16',
    },
    {
      id: '5',
      imageUrl: 'https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
      title: 'Moana 2',
      description:
        'Moana emprende una nueva y épica travesía hacia los mares lejanos de Oceanía, reuniendo a la antigua tripulación del mítico navegante Maui.',
      genre: 'Animación / Aventura',
      duration: '100 min',
      rating: 'APT',
    },
    {
      id: '6',
      imageUrl: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
      title: 'Gladiador 2',
      description:
        'La historia continúa décadas después del original. Un nuevo héroe debe luchar en el Coliseo Romano para salvar el Imperio.',
      genre: 'Acción / Drama',
      duration: '148 min',
      rating: '+14',
    },
  ],
}

const CANDY_STORE_MOCK: CandyStoreResponse = {
  data: [
    {
      id: 'c1',
      name: 'Combo Clásico',
      description: 'Canguil mediano + gaseosa mediana. La combinación perfecta para tu película.',
      price: 22.90,
      imageUrl: 'https://placehold.co/200x200/1a1a1a/ff2b2b?text=🍿',
      category: 'combo',
    },
    {
      id: 'c2',
      name: 'Combo Familiar',
      description: 'Canguil jumbo + 2 gaseosas medianas. Ideal para compartir en familia.',
      price: 39.90,
      imageUrl: 'https://placehold.co/200x200/1a1a1a/ff2b2b?text=🍿',
      category: 'combo',
    },
    {
      id: 'c3',
      name: 'Canguil Grande',
      description: 'Canguil salado o con mantequilla en tamaño grande. Crujiente y delicioso.',
      price: 14.90,
      imageUrl: 'https://placehold.co/200x200/1a1a1a/ff2b2b?text=🍿',
      category: 'snack',
    },
    {
      id: 'c4',
      name: 'Nachos con Queso',
      description: 'Crujientes nachos acompañados de salsa de queso cheddar caliente.',
      price: 12.90,
      imageUrl: 'https://placehold.co/200x200/1a1a1a/ff2b2b?text=🌮',
      category: 'snack',
    },
    {
      id: 'c5',
      name: 'Gaseosa Grande',
      description: 'Bebida gaseosa a elección en vaso grande. Pepsi, 7Up o Mirinda.',
      price: 9.90,
      imageUrl: 'https://placehold.co/200x200/1a1a1a/ff2b2b?text=🥤',
      category: 'drink',
    },
    {
      id: 'c6',
      name: 'Agua Mineral',
      description: 'Agua San Luis en botella 625ml. Refrescante y natural.',
      price: 5.90,
      imageUrl: 'https://placehold.co/200x200/1a1a1a/ff2b2b?text=💧',
      category: 'drink',
    },
    {
      id: 'c7',
      name: 'Hot Dog',
      description: 'Salchicha en pan brioche con mostaza, kétchup y mayonesa.',
      price: 11.90,
      imageUrl: 'https://placehold.co/200x200/1a1a1a/ff2b2b?text=🌭',
      category: 'snack',
    },
    {
      id: 'c8',
      name: 'Combo Pareja',
      description: '2 canguiles medianos + 2 gaseosas medianas. La cita perfecta.',
      price: 35.90,
      imageUrl: 'https://placehold.co/200x200/1a1a1a/ff2b2b?text=🍿',
      category: 'combo',
    },
  ],
}

// Simulate PayU response
const mockPayUResponse = (): PayUResponse => ({
  code: 'SUCCESS',
  transactionalCode: 'SUCCESS',
  operationDate: new Date().toISOString(),
  transactionId: crypto.randomUUID(),
  transactionResponse: {
    orderId: Math.floor(Math.random() * 9_000_000) + 1_000_000,
    transactionId: crypto.randomUUID(),
    state: 'APPROVED',
    paymentNetworkResponseCode: '00',
    paymentNetworkResponseErrorMessage: null,
    trazabilityCode: crypto.randomUUID().slice(0, 8).toUpperCase(),
    responseCode: 'APPROVED',
    operationDate: new Date().toISOString(),
  },
})

// ─── Handlers ─────────────────────────────────────────────────────────────────
export const handlers = [
  // GET /api/premieres
  http.get('/api/premieres', () => {
    return HttpResponse.json(PREMIERES_MOCK, { status: 200 })
  }),

  // GET /api/candystore
  http.get('/api/candystore', () => {
    return HttpResponse.json(CANDY_STORE_MOCK, { status: 200 })
  }),

  // POST /api/payu/payment
  http.post('/api/payu/payment', async () => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200))
    return HttpResponse.json(mockPayUResponse(), { status: 200 })
  }),

  // POST /api/complete
  http.post('/api/complete', async () => {
    await new Promise((r) => setTimeout(r, 800))
    const response: CompleteResponse = {
      code: '0',
      message: 'Transacción completada exitosamente',
    }
    return HttpResponse.json(response, { status: 200 })
  }),
]
