import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TravelRequest from './pages/TravelRequest.tsx';
import TravelOptions from './pages/TravelOptions.tsx';
import TravelHistory from './pages/TravelHistory.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {path:"/", element:<TravelRequest /> },
      {path:"/ride/confirmacao", element:<TravelOptions />},
      {path:"/ride/historico", element:<TravelHistory />},
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
