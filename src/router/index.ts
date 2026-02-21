import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';

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
    element: React.createElement(Layout),
    errorElement: React.createElement(NotFoundPage),
    children: [
      {
        index: true,
        element: React.createElement(HomePage),
      },
      {
        path: 'login',
        element: React.createElement(LoginPage),
      },
      {
        path: 'dulceria',
        element: React.createElement(DulceriaPage),
      },
      {
        path: 'pago',
        element: React.createElement(PagoPage),
      },
      {
        path: 'confirmacion',
        element: React.createElement(ConfirmacionPage),
      },
      {
        path: '404',
        element: React.createElement(NotFoundPage),
      },
      {
        path: '*',
        element: React.createElement(Navigate, { to: '/404', replace: true }),
      }
    ],
  }
]);
