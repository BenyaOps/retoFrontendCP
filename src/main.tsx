import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css'

import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { DulceriaPage } from '@/pages/DulceriaPage'
import { PagoPage } from '@/pages/PagoPage'
import { ConfirmacionPage } from '@/pages/ConfirmacionPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
// 1. Asegúrate de que la ruta coincida con tu carpeta y archivo real:
// Si el archivo es src/routes/AppRouter.tsx, cámbialo a '@/routes/AppRouter'
//import { router } from '@/router' 
const router = createBrowserRouter([
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

async function enableMocking() {
  // Solo activamos MSW en desarrollo para este reto 
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
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