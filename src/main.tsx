import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Onboarding from './pages/onboarding/Onboarding.tsx'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import Expense from './pages/dashboard/Expense.tsx'
import History from './pages/dashboard/History.tsx'
import Order from './pages/dashboard/Order.tsx'
import Todolist from './pages/dashboard/Todolist.tsx'
import ErrorPage from './error-page.tsx'


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
        path: "/onboarding",
    element: <Onboarding />,
    errorElement: <ErrorPage />,
      },
       {
        path: "/auth/login",
         element: <Login />,
    errorElement: <ErrorPage />,
        
      },
        {
        path: "/auth/register",
          element: <Register />,
    errorElement: <ErrorPage />,
        
      },
         {
        path: "/dashboard",
           element: <Dashboard />,
           errorElement: <ErrorPage />,
           children: [
            {
               path: "expense",
           element: <Expense />,
    errorElement: <ErrorPage />,
               
             },
             {
               path: "history",
               element: <History />,
    errorElement: <ErrorPage />,
               
             },
             {
               path: "order",
               element: <Order />,
    errorElement: <ErrorPage />,
               
             },
             {
               path: "todolist",
               element: <Todolist />,
    errorElement: <ErrorPage />,
               
          },
          ]

  },
         
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
