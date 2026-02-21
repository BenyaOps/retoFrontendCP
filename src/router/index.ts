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
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'dulceria',
        element: <DulceriaPage />,
      },
      {
        path: 'pago',
        element: <PagoPage />,
      },
      {
        path: 'confirmacion',
        element: <ConfirmacionPage />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      }
    ],
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  }
]);
