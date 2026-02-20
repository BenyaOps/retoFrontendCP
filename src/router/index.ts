// Ejemplo de router para Vite + React Router
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { DulceriaPage } from '@/pages/DulceriaPage'
import { PagoPage } from '@/pages/PagoPage'
import { ConfirmacionPage } from '@/pages/ConfirmacionPage'
import { NotFoundPage } from '@/pages/NotFoundPage'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />, // Manejo de errores 404 integrado
    children: [
      {
        index: true, // Ruta por defecto: Home [cite: 14, 69]
        element: <HomePage />,
      },
      {
        path: 'login', // Pantalla de Login [cite: 16, 72]
        element: <LoginPage />,
      },
      {
        path: 'dulceria', // Pantalla de Dulcería [cite: 32, 71]
        element: <DulceriaPage />,
      },
      {
        path: 'pago', // Pantalla de Pago [cite: 39]
        element: <PagoPage />,
      },
      {
        path: 'confirmacion', // Pantalla de compra exitosa 
        element: <ConfirmacionPage />,
      },
      {
        path: '*', // Redirección para rutas no encontradas
        element: <Navigate to="/404" replace />,
      }
    ],
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  }
]);
