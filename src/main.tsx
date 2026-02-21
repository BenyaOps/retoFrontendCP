import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { DulceriaPage } from '@/pages/DulceriaPage'
import { PagoPage } from '@/pages/PagoPage'
import { ConfirmacionPage } from '@/pages/ConfirmacionPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />, // Manejo de errores 404 integrado
    children: [
      {
        index: true, // Ruta por defecto
        element: <HomePage />,
      },
      {
        path: 'login', // Pantalla de Login 
        element: <LoginPage />,
      },
      {
        path: 'dulceria', // Pantalla de Dulcería 
        element: <DulceriaPage />,
      },
      {
        path: 'pago', // Pantalla de Pago 
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

async function enableMocking() {
  // Solo activamos MSW en enterno de desarrollo
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      {/* 2. ELIMINAMOS <BrowserRouter>. RouterProvider es suficiente. */}
      <RouterProvider router={router} />
    </React.StrictMode>
  )
})