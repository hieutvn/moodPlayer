import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Login from './Login';
import ErrorPage from './ErrorPage';
import { useNavigate, BrowserRouter } from 'react-router-dom';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';



const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: '/api/auth/login',
        element: <App />
    }

]);


createRoot(document.getElementById('root')).render(

    <React.StrictMode>

        <RouterProvider router={router} />

    </React.StrictMode>
)