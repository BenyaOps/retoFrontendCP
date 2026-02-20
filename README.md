## 🧪 Test

Actualmente el proyecto no incluye pruebas automatizadas, pero puedes agregar tests usando Jest, React Testing Library o Vitest.

Para agregar y ejecutar tests:

1. Instala una librería de testing (ejemplo con Vitest):
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
   ```
2. Crea archivos `*.test.tsx` o `*.spec.tsx` en la carpeta `src/`.
3. Agrega un script en `package.json`:
   ```json
   "scripts": {
     ...
     "test": "vitest"
   }
   ```
4. Ejecuta los tests:
   ```bash
   npm run test
   ```

Puedes consultar la documentación de [Vitest](https://vitest.dev/) o [React Testing Library](https://testing-library.com/docs/) para más detalles.

# Cineplanet Reto Frontend

Aplicación web de compra de entradas y dulcería para Cineplanet, desarrollada con React, TypeScript y Vite.

## 🚀 Get Started

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/BenyaOps/retoFrontendCP.git
   cd cp-reto-frontend
   ```
2. **Instala dependencias:**
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
4. Accede a `http://localhost:5173` en tu navegador.

## 📁 Estructura de archivos principal

```
cp-reto-frontend/
├── public/
│   └── mockServiceWorker.js
├── src/
│   ├── api/                # Servicios de autenticación, API y Firebase
│   ├── assets/             # Imágenes y recursos estáticos
│   ├── components/         # Componentes reutilizables y de UI
│   ├── mocks/              # Mock Service Worker para desarrollo
│   ├── pages/              # Páginas principales de la app
│   ├── router/             # Definición de rutas
│   ├── store/              # Zustand stores (usuario, carrito)
│   ├── types/              # Tipos y modelos TypeScript
│   ├── App.tsx             # Componente raíz
│   ├── main.tsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── package.json
├── vite.config.ts
└── ...
```

## 🧩 Librerías principales


| Librería | Propósito |
|----------|-----------|
| **React** | UI y componentes |
| **Vite** | Bundler y servidor de desarrollo |
| **TypeScript** | Tipado estático |
| **Zustand** | Manejo de estado global (usuario, carrito) |
| **React Router DOM** | Ruteo de páginas |
| **TailwindCSS** | Utilidades de estilos |
| **Axios** | Peticiones HTTP |
| **Firebase** | Autenticación con Google |
| **MSW** | Mock de APIs para desarrollo |
| **Lucide React** | Iconos SVG |
| **React Hook Form + Zod** | Formularios y validación |


## 📝 Descripción de carpetas y archivos clave

- **src/pages/**: Páginas principales (Home, Login, Dulcería, Pago, Confirmación, 404).
- **src/components/**: Componentes de UI, layout, pago, autenticación, etc.
- **src/api/**: Lógica de autenticación, servicios de negocio y configuración de Firebase.
- **src/store/**: Estado global con Zustand (usuario, carrito).
- **src/mocks/**: Handlers y configuración de MSW para simular APIs.
- **src/types/**: Tipos TypeScript para usuarios, productos, pagos, etc.

## 🛠️ Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Compila la app para producción.
- `npm run preview` — Previsualiza la build de producción.
- `npm run lint` — Linting del código fuente.

## 💡 Notas

- El proyecto está preparado para desarrollo local con mocks de API (MSW).
- Para autenticación real, configura tus credenciales de Firebase en `src/api/firebase.ts`.
- Los estilos siguen la paleta y branding de Cineplanet.

